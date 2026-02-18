"use client";
import React, { useState, useEffect } from 'react';
import { 
  Youtube, Search, Hash, Copy, CheckCircle, 
  Image as ImageIcon, Download, ThumbsUp, MessageSquare, 
  Eye, BarChart2, Calendar, AlertTriangle, Loader2, PlayCircle, Tag
} from 'lucide-react';

export default function YoutubeClient() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [copiedTags, setCopiedTags] = useState(false);

  // Loading text animation
  const [loadingText, setLoadingText] = useState('');
  useEffect(() => {
    if (!loading) return;
    const texts = [
      "Connecting to YouTube API...",
      "Extracting hidden meta tags...",
      "Calculating engagement metrics...",
      "Fetching high-res thumbnails..."
    ];
    let i = 0;
    setLoadingText(texts[0]);
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setLoadingText(texts[i]);
    }, 1000);
    return () => clearInterval(interval);
  }, [loading]);

  // Extract Video ID from URL
  const extractVideoID = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(shorts\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[8].length === 11) ? match[8] : false;
  };

  const analyzeVideo = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    const videoId = extractVideoID(url);
    if (!videoId) {
        setError("Invalid YouTube URL. Please enter a valid video link.");
        return;
    }

    setLoading(true);
    setError('');
    setVideoData(null);

    // ✅ अपनी असली API Key यहाँ डालें (जो आपने Google Cloud से ली है)
    const API_KEY = "यहाँ_अपनी_AIza_वाली_API_KEY_पेस्ट_करें"; 

    try {
        // Fetch Video Details using YouTube Data API v3
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        if (!data.items || data.items.length === 0) {
            throw new Error("Video not found or is private.");
        }

        const videoInfo = data.items[0];
        const snippet = videoInfo.snippet;
        const stats = videoInfo.statistics;

        // Calculate Engagement Rate ((Likes + Comments) / Views * 100)
        const views = parseInt(stats.viewCount || 0);
        const likes = parseInt(stats.likeCount || 0);
        const comments = parseInt(stats.commentCount || 0);
        const engagementRate = views > 0 ? (((likes + comments) / views) * 100).toFixed(2) : 0;

        // Extract Hashtags from description
        const descHashtags = snippet.description.match(/#[\w]+/g) || [];

        // Determine best thumbnail
        const bestThumbnail = snippet.thumbnails.maxres?.url || snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url;

        setVideoData({
            id: videoId,
            title: snippet.title,
            channel: snippet.channelTitle,
            publishedAt: new Date(snippet.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            description: snippet.description,
            tags: snippet.tags || [],
            hashtags: [...new Set(descHashtags)], // Unique hashtags
            thumbnails: snippet.thumbnails,
            bestThumbnail: bestThumbnail,
            stats: {
                views: views.toLocaleString(),
                likes: likes.toLocaleString(),
                comments: comments.toLocaleString(),
                engagementRate: engagementRate
            }
        });

    } catch (err) {
        setError(err.message || 'Network Error. Could not analyze the video.');
    } finally {
        setTimeout(() => setLoading(false), 800); // Smooth delay
    }
  };

  const copyTags = () => {
      if (!videoData || videoData.tags.length === 0) return;
      navigator.clipboard.writeText(videoData.tags.join(', '));
      setCopiedTags(true);
      setTimeout(() => setCopiedTags(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-20 pt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wide mb-6 shadow-sm border border-red-100">
                <Youtube className="mr-2" size={16} /> YouTube Analytics Pro
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-slate-900 tracking-tight">
                YouTube SEO <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">Analyzer</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Extract hidden video tags, analyze engagement rates, and download HD thumbnails. Master the YouTube algorithm.
            </p>
        </header>

        {/* --- SEARCH BAR --- */}
        <div className="max-w-4xl mx-auto bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 mb-12 relative z-10">
            <form onSubmit={analyzeVideo} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                    <PlayCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={24} />
                    <input 
                        type="url" required
                        placeholder="Paste YouTube Video URL (e.g. https://youtu.be/...)" 
                        className="w-full h-full p-4 pl-12 outline-none text-lg rounded-2xl bg-slate-50 focus:bg-white transition border border-transparent focus:border-red-300 focus:ring-4 focus:ring-red-50"
                        value={url} onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <button 
                    type="submit" disabled={loading}
                    className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-700 transition flex items-center justify-center gap-2 text-lg disabled:opacity-70 active:scale-95 shadow-lg shadow-red-200"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                    Analyze Video
                </button>
            </form>
        </div>

        {/* --- ERROR MESSAGE --- */}
        {error && (
            <div className="max-w-4xl mx-auto bg-rose-50 text-rose-700 p-5 rounded-2xl border border-rose-200 flex items-start gap-3 mb-8 animate-in fade-in slide-in-from-top-4">
                <AlertTriangle size={24} className="flex-shrink-0 mt-0.5" /> 
                <div>
                    <h4 className="font-bold">Analysis Failed</h4>
                    <p className="text-sm mt-1">{error}</p>
                    <p className="text-xs mt-2 opacity-80">(Note: Ensure your YouTube API Key is valid and the Data API v3 is enabled in Google Cloud)</p>
                </div>
            </div>
        )}

        {/* --- LOADING STATE --- */}
        {loading && (
            <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-sm border border-slate-200 p-16 text-center animate-in fade-in zoom-in duration-300">
                <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 border-4 border-red-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
                    <Youtube className="absolute inset-0 m-auto text-red-600 animate-pulse" size={32}/>
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-wide">Analyzing Video SEO...</h3>
                <p className="text-red-500 font-bold bg-red-50 inline-block px-4 py-2 rounded-full text-sm animate-pulse">{loadingText}</p>
            </div>
        )}

        {/* --- RESULTS DASHBOARD --- */}
        {videoData && !loading && (
            <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-500">
                
                {/* 1. Video Header (Thumbnail + Basic Info) */}
                <div className="bg-white rounded-[2rem] p-6 border shadow-sm flex flex-col lg:flex-row gap-8">
                    {/* Thumbnail Preview */}
                    <div className="w-full lg:w-1/3 flex-shrink-0 relative rounded-2xl overflow-hidden group">
                        <img src={videoData.bestThumbnail} alt="Thumbnail" className="w-full h-auto aspect-video object-cover transition duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                            <a href={videoData.bestThumbnail} target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-red-700 transition">
                                <Download size={16}/> Download HD
                            </a>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1">
                                <Youtube size={14} className="text-red-600"/> {videoData.channel}
                            </span>
                            <span className="text-slate-400 text-sm flex items-center gap-1">
                                <Calendar size={14}/> Published: {videoData.publishedAt}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight">{videoData.title}</h2>
                        
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto">
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Eye size={14}/> Views</div>
                                <div className="text-xl font-black text-slate-800">{videoData.stats.views}</div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><ThumbsUp size={14}/> Likes</div>
                                <div className="text-xl font-black text-slate-800">{videoData.stats.likes}</div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><MessageSquare size={14}/> Comments</div>
                                <div className="text-xl font-black text-slate-800">{videoData.stats.comments}</div>
                            </div>
                            <div className={`p-4 rounded-2xl border ${videoData.stats.engagementRate > 5 ? 'bg-emerald-50 border-emerald-200' : 'bg-orange-50 border-orange-200'}`}>
                                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><BarChart2 size={14}/> Engagement</div>
                                <div className={`text-xl font-black ${videoData.stats.engagementRate > 5 ? 'text-emerald-700' : 'text-orange-700'}`}>
                                    {videoData.stats.engagementRate}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* 2. Hidden Tags Section (Takes 2 columns) */}
                    <div className="lg:col-span-2 bg-white rounded-[2rem] border shadow-sm overflow-hidden flex flex-col">
                        <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Tag className="text-red-500"/> Hidden Video Tags</h3>
                                <p className="text-sm text-slate-500 mt-1">Keywords used by the creator to rank this video.</p>
                            </div>
                            {videoData.tags.length > 0 && (
                                <button onClick={copyTags} className={`px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition ${copiedTags ? 'bg-emerald-100 text-emerald-700' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}>
                                    {copiedTags ? <CheckCircle size={16}/> : <Copy size={16}/>} {copiedTags ? 'Copied!' : 'Copy Tags'}
                                </button>
                            )}
                        </div>
                        
                        <div className="p-6 flex-1 bg-slate-50/50">
                            {videoData.tags.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {videoData.tags.map((tag, idx) => (
                                        <span key={idx} className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm hover:border-red-300 transition cursor-default">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400 py-10">
                                    <AlertTriangle size={32} className="mb-2 opacity-50"/>
                                    <p className="font-medium">No hidden tags found for this video.</p>
                                </div>
                            )}
                        </div>
                        
                        {/* Hashtags from Description */}
                        {videoData.hashtags.length > 0 && (
                            <div className="p-6 border-t border-slate-100 bg-white">
                                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2"><Hash size={16} className="text-blue-500"/> Hashtags in Description</h4>
                                <div className="flex flex-wrap gap-2">
                                    {videoData.hashtags.map((htag, idx) => (
                                        <span key={idx} className="text-blue-600 font-bold text-sm hover:underline cursor-pointer">{htag}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 3. Description & Diagnostics */}
                    <div className="bg-white rounded-[2rem] border shadow-sm flex flex-col">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><FileText size={20} className="text-slate-400"/> Video Description</h3>
                        </div>
                        <div className="p-6 bg-slate-50 flex-1 overflow-y-auto max-h-[400px] custom-scroll">
                            <pre className="whitespace-pre-wrap font-sans text-sm text-slate-600 leading-relaxed">
                                {videoData.description || "No description provided."}
                            </pre>
                        </div>
                        <div className="p-4 border-t border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                            Word Count: {videoData.description.split(/\s+/).filter(w => w.length > 0).length}
                        </div>
                    </div>
                </div>

            </div>
        )}

        {/* --- SEO ARTICLE & CONTENT --- */}
        <section className="mt-20 bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-200 prose prose-red max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Mastering YouTube SEO in 2026</h2>
            <p className="text-slate-600 leading-relaxed text-lg text-center max-w-3xl mx-auto mb-12">
                YouTube is the world's second-largest search engine. To get views, you need to understand how top creators optimize their metadata. Our advanced analyzer helps you reverse-engineer viral videos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose mb-12">
                <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-red-600 shadow-sm mb-4"><Tag size={24}/></div>
                    <h3 className="font-bold text-slate-900 text-xl mb-2">Hidden Meta Tags</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">Tags help the YouTube algorithm understand your video's content. Discover the exact keyword combinations successful creators use to rank #1.</p>
                </div>
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm mb-4"><BarChart2 size={24}/></div>
                    <h3 className="font-bold text-slate-900 text-xl mb-2">Engagement Rate</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">A high engagement rate (Likes + Comments / Views) tells YouTube that viewers love the content, pushing the video into "Recommended" feeds.</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm mb-4"><ImageIcon size={24}/></div>
                    <h3 className="font-bold text-slate-900 text-xl mb-2">HD Thumbnails</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">Thumbnails drive Click-Through Rate (CTR). Easily download competitor thumbnails to analyze their design, colors, and typography.</p>
                </div>
            </div>

            <div className="border-t border-slate-100 pt-8 mt-8 not-prose">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">How to use this tool?</h3>
                <ul className="space-y-4">
                    <li className="flex gap-3 bg-slate-50 p-4 rounded-xl">
                        <CheckCircle className="text-red-500 mt-0.5 flex-shrink-0" size={20}/>
                        <div><strong className="text-slate-800">1. Find a Competitor:</strong> Go to YouTube and find a viral video in your niche. Copy its URL.</div>
                    </li>
                    <li className="flex gap-3 bg-slate-50 p-4 rounded-xl">
                        <CheckCircle className="text-red-500 mt-0.5 flex-shrink-0" size={20}/>
                        <div><strong className="text-slate-800">2. Analyze:</strong> Paste the link into our tool. We will securely fetch all the hidden data via the official YouTube API.</div>
                    </li>
                    <li className="flex gap-3 bg-slate-50 p-4 rounded-xl">
                        <CheckCircle className="text-red-500 mt-0.5 flex-shrink-0" size={20}/>
                        <div><strong className="text-slate-800">3. Optimize:</strong> Copy their best tags, study their engagement metrics, and use those insights to craft your next viral video.</div>
                    </li>
                </ul>
            </div>
        </section>

      </div>
      
      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
}

// Missing Lucide Icon fallback (if FileText wasn't imported properly)
import { FileText } from 'lucide-react';