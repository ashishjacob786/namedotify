import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req) {
  try {
    const { url } = await req.json();

    let targetUrl = url;
    if (!targetUrl.startsWith('http')) targetUrl = 'https://' + targetUrl;

    const parsedUrl = new URL(targetUrl);
    const baseUrl = parsedUrl.origin;

    // 1. Fetch Target Website HTML
    const response = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NameDotifyAgentBot/1.0)' },
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to access the website.' }, { status: 400 });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    let score = 10; // Base score
    let passedChecks = 0;
    let failedChecks = 0;
    let warnings = 0;
    let insights = [];

    // --- WEBMCP & AGENT READINESS CHECKS ---

    // Check 1: navigator.modelContext (Imperative API Check)
    const scriptContent = $('script').text();
    if (scriptContent.includes('navigator.modelContext') || scriptContent.includes('modelContext.registerTool')) {
      score += 40;
      passedChecks++;
      insights.push({ type: 'success', text: 'Imperative API Found: navigator.modelContext is actively registering tools for AI Agents.' });
    } else {
      failedChecks++;
      insights.push({ type: 'error', text: 'Missing Imperative API: No navigator.modelContext found. AI cannot execute dynamic actions here.' });
    }

    // Check 2: Declarative AI Tags (Meta tags for AI)
    const hasAiMeta = $('meta[name="agent-mode"]').length > 0 || $('meta[name="webmcp"]').length > 0 || $('meta[name="robots"]').attr('content')?.includes('ai-agent');
    if (hasAiMeta) {
      score += 15;
      passedChecks++;
      insights.push({ type: 'success', text: 'Declarative Meta Tags Found: AI-specific instructions detected in <head>.' });
    } else {
      warnings++;
      insights.push({ type: 'warning', text: 'No Declarative Meta Tags: Consider adding <meta name="webmcp" content="allow"> for better agent crawling.' });
    }

    // Check 3: Semantic Structure (Crucial for AI parsing)
    if ($('main').length > 0 && $('nav').length > 0) {
      score += 15;
      passedChecks++;
      insights.push({ type: 'success', text: 'Semantic HTML5 structure is perfect for LLM token extraction.' });
    } else {
      warnings++;
      insights.push({ type: 'warning', text: 'Poor Semantic Structure: Missing <main> or <nav> tags makes it hard for AI to find core content.' });
    }

    // Check 4: .well-known/webmcp.json or ai-plugin.json check
    try {
      const wellKnownRes = await fetch(`${baseUrl}/.well-known/webmcp.json`, { method: 'HEAD' });
      const wellKnownResAlt = await fetch(`${baseUrl}/.well-known/ai-plugin.json`, { method: 'HEAD' });
      
      if (wellKnownRes.ok || wellKnownResAlt.ok) {
        score += 20;
        passedChecks++;
        insights.push({ type: 'success', text: 'Agent Manifest Found: .well-known directory contains AI configuration files.' });
      } else {
        warnings++;
        insights.push({ type: 'warning', text: 'No Agent Manifest: /.well-known/webmcp.json is missing.' });
      }
    } catch (e) {
      warnings++;
      insights.push({ type: 'warning', text: 'Could not verify /.well-known directory (Server blocked request).' });
    }

    return NextResponse.json({
      success: true,
      data: {
        agentScore: Math.min(score, 100),
        metrics: { passed: passedChecks, failed: failedChecks, warnings: warnings },
        insights: insights
      }
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error analyzing WebMCP compliance.' }, { status: 500 });
  }
}