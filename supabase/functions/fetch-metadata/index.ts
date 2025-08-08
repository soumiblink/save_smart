// supabase/functions/fetch-metadata/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// import { serve } from "Deno"
// Step 2: Update supabase/functions/fetch-metadata/index.ts
// import { corsHeaders } from '../_shared/cors.ts'
// Step 1: Create supabase/functions/_shared/cors.ts
//  const corsHeaders = {
//   'Access-Control-Allow-Origin':  'http://localhost:5173',
//   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
//   'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
// }


serve(async (req) => {
  // CRITICAL: Handle OPTIONS request FIRST - this MUST be at the top!
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { url } = await req.json()

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate URL
    let normalizedUrl: string
    try {
      const urlObj = new URL(url)
      normalizedUrl = urlObj.toString()
    } catch (e) {
      return new Response(
        JSON.stringify({ error: 'Invalid URL format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Fetch the webpage
    const response = await fetch(normalizedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const html = await response.text()

    // Extract metadata using regex
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i)
    const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
    const ogDescriptionMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i)
    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
    const faviconMatch = html.match(/<link[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*href=["']([^"']+)["']/i)

    const baseUrl = new URL(normalizedUrl).origin
    
    const metadata = {
      title: ogTitleMatch?.[1] || titleMatch?.[1]?.trim() || new URL(normalizedUrl).hostname,
      description: ogDescriptionMatch?.[1] || descriptionMatch?.[1] || '',
      image: ogImageMatch?.[1] ? new URL(ogImageMatch[1], baseUrl).href : '',
      favicon: faviconMatch?.[1] ? new URL(faviconMatch[1], baseUrl).href : `${baseUrl}/favicon.ico`,
      url: normalizedUrl
    }

    return new Response(
      JSON.stringify(metadata),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch metadata',
        details: error.message
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

// Step 3: Create supabase/functions/generate-summary/index.ts


serve(async (req) => {
  // CRITICAL: Handle OPTIONS request FIRST
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { url } = await req.json()

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // For now, return a placeholder summary
    // Replace this with your actual AI summary generation logic
    const summary = `Summary for: ${url}`

    return new Response(
      JSON.stringify({ summary }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Summary generation error:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to generate summary',
        details: error.message
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

// Step 4: Deployment Commands
/*
# Deploy both functions
supabase functions deploy fetch-metadata
supabase functions deploy generate-summary

# Test locally (optional)
supabase functions serve

# Test with curl
curl -X POST "https://your-project.supabase.co/functions/v1/fetch-metadata" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com"}'
*/
// Define CORS headers directly in this file
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
}

const TIMEOUT = 10000; // 10 seconds timeout
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second between retries

// Sleep utility function
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> {
  try {
    const response = await fetch(url, options);
    if (!response.ok && response.status >= 500) {
      throw new Error(`Server error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... attempts left: ${retries}`);
      await sleep(RETRY_DELAY);
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

function extractMetaContent(html: string, selector: string): string | null {
  try {
    const regex = new RegExp(`<meta[^>]*${selector}[^>]*content=["']([^"']+)["']`, 'i');
    const match = html.match(regex);
    return match ? match[1] : null;
  } catch (e) {
    return null;
  }
}

function extractTitle(html: string): string {
  try {
    // Try Open Graph title first
    let title = extractMetaContent(html, 'property=["\'"]og:title["\'"]');
    
    if (!title) {
      // Try Twitter title
      title = extractMetaContent(html, 'name=["\'"]twitter:title["\'"]');
    }
    
    if (!title) {
      // Try regular title tag
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      title = titleMatch ? titleMatch[1] : null;
    }
    
    return title ? title.replace(/\s+/g, ' ').trim() : '';
  } catch (e) {
    return '';
  }
}

function extractDescription(html: string): string {
  try {
    // Try Open Graph description first
    let description = extractMetaContent(html, 'property=["\'"]og:description["\'"]');
    
    if (!description) {
      // Try Twitter description
      description = extractMetaContent(html, 'name=["\'"]twitter:description["\'"]');
    }
    
    if (!description) {
      // Try regular meta description
      description = extractMetaContent(html, 'name=["\'"]description["\'"]');
    }
    
    return description ? description.replace(/\s+/g, ' ').trim() : '';
  } catch (e) {
    return '';
  }
}

function extractImage(html: string, baseUrl: string): string {
  try {
    // Try Open Graph image first
    let image = extractMetaContent(html, 'property=["\'"]og:image["\'"]');
    
    if (!image) {
      // Try Twitter image
      image = extractMetaContent(html, 'name=["\'"]twitter:image["\'"]');
    }
    
    if (image) {
      // Resolve relative URLs
      try {
        return new URL(image, baseUrl).href;
      } catch (e) {
        return image.startsWith('http') ? image : '';
      }
    }
    
    return '';
  } catch (e) {
    return '';
  }
}

function extractFavicon(html: string, baseUrl: string): string {
  try {
    // Try to find favicon link
    const faviconRegex = /<link[^>]*rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]*href=["']([^"']+)["']/i;
    const match = html.match(faviconRegex);
    
    let favicon = match ? match[1] : '/favicon.ico';
    
    // Resolve relative URLs
    try {
      return new URL(favicon, baseUrl).href;
    } catch (e) {
      return new URL('/favicon.ico', baseUrl).href;
    }
  } catch (e) {
    try {
      return new URL('/favicon.ico', baseUrl).href;
    } catch (err) {
      return '';
    }
  }
}

serve(async (req) => {
  console.log('Request method:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log('Request body:', body);
    
    const { url } = body;

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate and normalize the URL
    let normalizedUrl: string;
    let baseUrl: string;
    
    try {
      const urlObj = new URL(url);
      normalizedUrl = urlObj.toString();
      baseUrl = `${urlObj.protocol}//${urlObj.host}`;
    } catch (e) {
      return new Response(
        JSON.stringify({ error: 'Invalid URL format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Fetching metadata for:', normalizedUrl);

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

    try {
      const response = await fetchWithRetry(normalizedUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        }
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      console.log('HTML fetched, length:', html.length);

      // Extract metadata using regex (more reliable than DOM parsing in Edge Functions)
      const title = extractTitle(html) || new URL(normalizedUrl).hostname;
      const description = extractDescription(html);
      const image = extractImage(html, baseUrl);
      const favicon = extractFavicon(html, baseUrl);

      const metadata = {
        title,
        description,
        image,
        favicon,
        url: normalizedUrl
      };

      console.log('Extracted metadata:', metadata);

      return new Response(
        JSON.stringify(metadata),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );

    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.error('Fetch error:', fetchError);
      
      // Return fallback metadata
      const fallbackMetadata = {
        title: new URL(normalizedUrl).hostname,
        description: '',
        image: '',
        favicon: new URL('/favicon.ico', baseUrl).href,
        url: normalizedUrl
      };

      return new Response(
        JSON.stringify(fallbackMetadata),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to process request',
        details: error.message
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});