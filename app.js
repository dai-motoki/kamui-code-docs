// YAML注入データが文字列の可能性に対応
function parseMaybeJSON(value) {
    if (typeof value === 'string') {
        try { return JSON.parse(value); } catch (_) { return value; }
    }
    return value;
}

// メニュー構造データ（HugoのYAML dataがあれば優先）
const menuData = (typeof window !== 'undefined' && window.MENU_DATA)
  ? parseMaybeJSON(window.MENU_DATA)
  : [
    { id: 'home', type: 'menu', label: 'ホーム', icon: '🏠', path: '/' },
    { id: 'lp', type: 'menu', label: 'LP', icon: '📄', path: '/lp' },
    { id: 'welcome', type: 'menu', label: 'はじめまして', icon: '👋', path: '/welcome' },
    {
        id: 'mcp-playlist',
        type: 'group',
        label: 'MCP SaaS',
        icon: '📚',
        path: '/playlist',
        children: [
            { id: 'playlist-all', type: 'menu', label: 'MCP SaaS一覧', path: '/playlist/all' },
            { id: 'playlist-creative', type: 'menu', label: 'クリエイティブ', path: '/playlist/creative' },
            { id: 'playlist-development', type: 'menu', label: '開発', path: '/playlist/development' },
            { id: 'playlist-business', type: 'menu', label: 'ビジネス', path: '/playlist/business' }
        ]
    },
    {
        id: 'mcp-catalog',
        type: 'group',
        label: 'MCP リスト',
        icon: '📦',
        path: '/catalog',
        children: [
            { id: 'catalog-all', type: 'menu', label: 'MCP リスト一覧', path: '/catalog/all' },
            {
                id: 'catalog-creative',
                type: 'menu',
                label: 'クリエイティブ',
                path: '/catalog/creative',
                children: [
                    { id: 't2i-imagen4', type: 'catalog-id', label: 'Imagen4 Ultra (T2I)', path: '/catalog/id/t2i/fal/imagen4/ultra' },
                    { id: 'i2i-flux', type: 'catalog-id', label: 'Flux Kontext (I2I)', path: '/catalog/id/i2i/fal/flux/kontext/max' }
                ]
            },
            {
                id: 'catalog-development',
                type: 'menu',
                label: '開発',
                path: '/catalog/development',
                children: [
                    { id: 't2v-wan', type: 'catalog-id', label: 'WAN 2.2-5b (T2V)', path: '/catalog/id/t2v/fal/wan/v2.2-5b/text-to-video' },
                    { id: 'uploader', type: 'catalog-id', label: 'Uploader (Service)', path: '/catalog/id/uploader/fal' }
                ]
            },
            {
                id: 'catalog-business',
                type: 'menu',
                label: 'ビジネス',
                path: '/catalog/business',
                children: [
                    { id: 'req-docs', type: 'catalog-id', label: 'Requirements Docs', path: '/catalog/id/requirement' }
                ]
            }
        ]
    }
];

// ページコンテンツ（HugoのYAML dataがあれば優先）
const pageContents = (function() {
    if (typeof window !== 'undefined' && window.PAGE_CONTENTS) {
        const src = parseMaybeJSON(window.PAGE_CONTENTS);
        const out = {};
        for (const k in src) {
            const v = src[k];
            out[k] = (v && v.html) ? v.html : v;
        }
        return out;
    }
    return {
    home: `
        <div class="hero">
            <img src="./kamui-docs-ui-pattern2-gradient.png" alt="KAMUI CODE トップ" />
        </div>

        <div class="cards-grid">
            <div class="card creative" onclick="navigateTo('playlist-creative')">
                <div class="card-header">
                    <h2 class="card-title">Creative tools</h2>
                    <p class="card-subtitle">Dignida oodo seruidors</p>
                </div>
                <span class="card-tag">✨ Inter font</span>
                <p class="card-content">
                    画像生成、動画生成、音声生成など<br>
                    クリエイティブツールのMCPサーバー
                </p>
                <span class="card-icon"></span>
            </div>
            
            <div class="card development" onclick="navigateTo('playlist-development')">
                <div class="card-header">
                    <h2 class="card-title">Development</h2>
                    <p class="card-subtitle">Dignida oodo seruidors</p>
                </div>
                <span class="card-tag">✨ Inter font</span>
                <p class="card-content">
                    開発ツール、CI/CD、テスト自動化など<br>
                    開発向けMCPサーバー
                </p>
                <span class="card-icon">💻</span>
            </div>
            
            <div class="card business" onclick="navigateTo('playlist-business')">
                <div class="card-header">
                    <h2 class="card-title">Business</h2>
                    <p class="card-subtitle">Dignida oodo seruidors</p>
                </div>
                <span class="card-tag">✨ Inter font</span>
                <p class="card-content">
                    要件定義、ストーリーボード、<br>
                    ビジネス文書生成のMCPサーバー
                </p>
                <span class="card-icon">💼</span>
            </div>
        </div>
    `,
    
    // MCP Playlist landing
    'mcp-playlist': `
        <div class="page-header">
            <h1 class="page-title">KAMUI CODE MCP Servers</h1>
            <div class="page-divider"></div>
        </div>
        
        <div class="cards-section">
            <div class="cards-grid-3col">
                <div class="card-modern creative" onclick="navigateTo('playlist-creative')">
                    <div class="card-content">
                        <div class="card-header">
                            <h2 class="card-title">Creative tools</h2>
                            <p class="card-subtitle">Dignida oodo servidors</p>
                        </div>
                        <span class="card-tag">✨ Inter font</span>
                        <div class="card-code-section">
                            <div class="code-snippet">
                                <span class="code-comment"># Imagen Generation</span>
                                <span class="code-line">generate_image(<span class="code-string">"beautiful landscape"</span>)</span>
                                <span class="code-comment"># Video Creation</span>
                                <span class="code-line">create_video(<span class="code-string">prompt</span>=<span class="code-string">"sunset timelapse"</span>)</span>
                                <span class="code-comment"># Audio Synthesis</span>
                                <span class="code-line">synthesize_voice(<span class="code-string">text</span>, <span class="code-string">voice</span>=<span class="code-string">"natural"</span>)</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-orb creative-orb"></div>
                </div>
                
                <div class="card-modern development" onclick="navigateTo('playlist-development')">
                    <div class="card-content">
                        <div class="card-header">
                            <h2 class="card-title">Development</h2>
                            <p class="card-subtitle">Dignida oodo servers</p>
                        </div>
                        <span class="card-tag">✨ Inter font</span>
                        <div class="card-code-section">
                            <div class="code-snippet">
                                <span class="code-comment"># Upload Assets</span>
                                <span class="code-line">upload_file(<span class="code-string">path</span>=<span class="code-string">"/assets/video.mp4"</span>)</span>
                                <span class="code-comment"># Process Media</span>
                                <span class="code-line">process_video(<span class="code-var">input_url</span>, <span class="code-var">options</span>)</span>
                                <span class="code-comment"># Analyze Content</span>
                                <span class="code-line">analyze_frames(<span class="code-var">video_id</span>)</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-orb development-orb"></div>
                </div>
                
                <div class="card-modern business" onclick="navigateTo('playlist-business')">
                    <div class="card-content">
                        <div class="card-header">
                            <h2 class="card-title">Business</h2>
                            <p class="card-subtitle">Dignida oodo servidors</p>
                        </div>
                        <span class="card-tag">✨ Inter font</span>
                        <div class="card-code-section">
                            <div class="code-snippet">
                                <span class="code-comment"># Requirements Generation</span>
                                <span class="code-line">generate_requirements(<span class="code-var">project</span>)</span>
                                <span class="code-comment"># 絵コンテ・ビデオコンテ Creation</span>
                                <span class="code-line">create_storyboard(<span class="code-var">script</span>)</span>
                                <span class="code-comment"># Voice Over</span>
                                <span class="code-line">narrate_content(<span class="code-var">text</span>, <span class="code-string">lang</span>=<span class="code-string">"ja"</span>)</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-orb business-orb"></div>
                </div>
            </div>
        </div>
    `,
    
    lp: `
        <h1 class="page-title">KAMUI CODE</h1>
        <p class="page-subtitle">AIを活用した次世代開発プラットフォーム</p>
        
        <div class="content">
            <h2>特徴</h2>
            <ul>
                <li>🚀 高速な画像・動画生成</li>
                <li> クリエイティブツール統合</li>
                <li>💻 開発ワークフロー自動化</li>
                <li>📊 ビジネス文書自動生成</li>
            </ul>
        </div>
    `,
    
    welcome: `
        <h1 class="page-title">はじめまして</h1>
        <p class="page-subtitle">KAMUI CODEへようこそ</p>
        
        <div class="content">
            <p>KAMUI CODEは、AI技術を活用した統合開発プラットフォームです。</p>
            <p>画像生成、動画生成、音声合成、開発支援など、様々なAIサービスをMCPサーバーとして提供しています。</p>
            
            <h3>はじめ方</h3>
            <ol>
                <li>MCP SaaSから必要なサービスを選択</li>
                <li>MCPサーバーURLをコピー</li>
                <li>Claude Codeの設定に追加</li>
                <li>AIパワーで開発を加速！</li>
            </ol>
        </div>
    `,
    




    
    'catalog-all': `
        <h1 class="page-title">MCP リスト一覧</h1>
        <p class="page-subtitle">利用可能な全MCPサービス</p>
        
        <div class="catalog-grid">
            <div class="catalog-item" onclick="navigateTo('catalog-detail-imagen4')">
                <h3 class="catalog-name">Imagen4 Ultra</h3>
                <p class="catalog-path">t2i/fal/imagen4/ultra</p>
                <p class="catalog-description">Google DeepMindの最新画像生成モデル</p>
            </div>
            
            <div class="catalog-item" onclick="navigateTo('catalog-detail-flux')">
                <h3 class="catalog-name">Flux Kontext Max</h3>
                <p class="catalog-path">i2i/fal/flux/kontext/max</p>
                <p class="catalog-description">高品質な画像編集・変換モデル</p>
            </div>
            
            <div class="catalog-item" onclick="navigateTo('catalog-detail-wan')">
                <h3 class="catalog-name">WAN 2.2-5b</h3>
                <p class="catalog-path">t2v/fal/wan/v2.2-5b</p>
                <p class="catalog-description">テキストから動画を生成</p>
            </div>
            
            <div class="catalog-item" onclick="navigateTo('catalog-detail-minimax')">
                <h3 class="catalog-name">MiniMax Speech</h3>
                <p class="catalog-path">t2s/minimax/speech-2.5-turbo</p>
                <p class="catalog-description">自然な音声合成サービス</p>
            </div>
        </div>
    `,

    'mcp-catalog': `
        <div class="page-header">
            <h1 class="page-title">KAMUI CODE MCP Servers</h1>
            <div class="page-divider"></div>
        </div>
        
        <div class="cards-section">
            <div class="cards-grid-3col">
                <div class="card-modern creative" onclick="navigateTo('catalog-creative')">
                    <div class="card-content">
                        <div class="card-header">
                            <h2 class="card-title">Creative tools</h2>
                            <p class="card-subtitle">Dignida oodo servidors</p>
                        </div>
                        <span class="card-tag">✨ Inter font</span>
                        <div class="card-code-section">
                            <div class="code-snippet">
                                <span class="code-comment"># Imagen Generation</span>
                                <span class="code-line">generate_image(<span class="code-string">"beautiful landscape"</span>)</span>
                                <span class="code-comment"># Video Creation</span>
                                <span class="code-line">create_video(<span class="code-string">prompt</span>=<span class="code-string">"sunset timelapse"</span>)</span>
                                <span class="code-comment"># Audio Synthesis</span>
                                <span class="code-line">synthesize_voice(<span class="code-string">text</span>, <span class="code-string">voice</span>=<span class="code-string">"natural"</span>)</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-orb creative-orb"></div>
                </div>
                
                <div class="card-modern development" onclick="navigateTo('catalog-development')">
                    <div class="card-content">
                        <div class="card-header">
                            <h2 class="card-title">Development</h2>
                            <p class="card-subtitle">Dignida oodo servers</p>
                        </div>
                        <span class="card-tag">✨ Inter font</span>
                        <div class="card-code-section">
                            <div class="code-snippet">
                                <span class="code-comment"># Upload Assets</span>
                                <span class="code-line">upload_file(<span class="code-string">path</span>=<span class="code-string">"/assets/video.mp4"</span>)</span>
                                <span class="code-comment"># Process Media</span>
                                <span class="code-line">process_video(<span class="code-var">input_url</span>, <span class="code-var">options</span>)</span>
                                <span class="code-comment"># Analyze Content</span>
                                <span class="code-line">analyze_frames(<span class="code-var">video_id</span>)</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-orb development-orb"></div>
                </div>
                
                <div class="card-modern business" onclick="navigateTo('catalog-business')">
                    <div class="card-content">
                        <div class="card-header">
                            <h2 class="card-title">Business</h2>
                            <p class="card-subtitle">Dignida oodo servidors</p>
                        </div>
                        <span class="card-tag">✨ Inter font</span>
                        <div class="card-code-section">
                            <div class="code-snippet">
                                <span class="code-comment"># Requirements Generation</span>
                                <span class="code-line">generate_requirements(<span class="code-var">project</span>)</span>
                                <span class="code-comment"># 絵コンテ・ビデオコンテ Creation</span>
                                <span class="code-line">create_storyboard(<span class="code-var">script</span>)</span>
                                <span class="code-comment"># Voice Over</span>
                                <span class="code-line">narrate_content(<span class="code-var">text</span>, <span class="code-string">lang</span>=<span class="code-string">"ja"</span>)</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-orb business-orb"></div>
                </div>
            </div>
        </div>
    `,

    'catalog-creative': `
        <h1 class="page-title">MCP リスト: クリエイティブ</h1>
        <p class="page-subtitle">生成・編集系のMCPサーバー</p>
        <div class="catalog-grid">
            <div class="catalog-item" onclick="navigateTo('t2i-imagen4')">
                <h3 class="catalog-name">Imagen4 Ultra</h3>
                <p class="catalog-path">t2i/fal/imagen4/ultra</p>
                <p class="catalog-description">高品質の画像生成</p>
            </div>
            <div class="catalog-item" onclick="navigateTo('i2i-flux')">
                <h3 class="catalog-name">Flux Kontext Max</h3>
                <p class="catalog-path">i2i/fal/flux/kontext/max</p>
                <p class="catalog-description">画像編集/変換の高性能モデル</p>
            </div>
        </div>
    `,

    'catalog-development': `
        <h1 class="page-title">MCP リスト: 開発</h1>
        <p class="page-subtitle">開発支援系のMCPサーバー</p>
        <div class="catalog-grid">
            <div class="catalog-item" onclick="navigateTo('t2v-wan')">
                <h3 class="catalog-name">WAN 2.2-5b (T2V)</h3>
                <p class="catalog-path">t2v/fal/wan/v2.2-5b</p>
                <p class="catalog-description">テキストから動画を生成</p>
            </div>
            <div class="catalog-item" onclick="navigateTo('uploader')">
                <h3 class="catalog-name">Uploader</h3>
                <p class="catalog-path">service/uploader/fal</p>
                <p class="catalog-description">アセットのアップロード/配信補助</p>
            </div>
        </div>
    `,

    'catalog-business': `
        <h1 class="page-title">MCP リスト: ビジネス</h1>
        <p class="page-subtitle">ドキュメント/要件定義支援</p>
        <div class="catalog-grid">
            <div class="catalog-item" onclick="navigateTo('req-docs')">
                <h3 class="catalog-name">Requirements Docs</h3>
                <p class="catalog-path">catalog/requirement</p>
                <p class="catalog-description">要件定義ドキュメントの参照</p>
            </div>
        </div>
    `,

    // Catalog detail pages
    'catalog-detail-imagen4': `
        <h1 class="page-title">Imagen4 Ultra</h1>
        <p class="page-subtitle">画像生成モデルの詳細</p>
        <p>詳細は <a href="#t2i-imagen4" onclick="navigateTo('t2i-imagen4')">こちら</a> を参照。</p>
    `,
    'catalog-detail-flux': `
        <h1 class="page-title">Flux Kontext Max</h1>
        <p class="page-subtitle">画像編集/変換モデルの詳細</p>
        <p>詳細は <a href="#i2i-flux" onclick="navigateTo('i2i-flux')">こちら</a> を参照。</p>
    `,
    'catalog-detail-wan': `
        <h1 class="page-title">WAN 2.2-5b</h1>
        <p class="page-subtitle">テキストから動画作成</p>
        <p>詳細は <a href="#t2v-wan" onclick="navigateTo('t2v-wan')">こちら</a> を参照。</p>
    `,
    'catalog-detail-minimax': `
        <h1 class="page-title">MiniMax Speech</h1>
        <p class="page-subtitle">テキスト読み上げ</p>
        <p>詳細は <a href="#text-to-speech" onclick="navigateTo('text-to-speech')">こちら</a> を参照。</p>
    `,

    // Individual catalog item pages
    't2i-imagen4': `
        <h1 class="page-title">Imagen4 Ultra (Text-to-Image)</h1>
        <p class="page-subtitle">高品質の画像生成エンジン</p>
        <div class="content">
            <h3>Endpoint</h3>
            <pre class="code"><code>/catalog/id/t2i/fal/imagen4/ultra</code></pre>
            <h3>mcp/config.json (例)</h3>
            <pre class="code"><code>{
  "mcpServers": [
    {
      "name": "fal/imagen4/ultra",
      "type": "t2i",
      "baseUrl": "YOUR_BASE_URL/t2i/fal/imagen4/ultra",
      "options": { "guidance_scale": 3.5, "safety_tolerance": 2 }
    }
  ]
}</code></pre>
            <h3>Notes</h3>
            <ul>
                <li>guidance_scale: 1–20</li>
                <li>safety_tolerance: 1–6</li>
            </ul>
        </div>
    `,
    'i2i-flux': `
        <h1 class="page-title">Flux Kontext Max (Image-to-Image)</h1>
        <p class="page-subtitle">高精度な画像編集/変換</p>
        <div class="content">
            <h3>Endpoint</h3>
            <pre class="code"><code>/catalog/id/i2i/fal/flux/kontext/max</code></pre>
            <h3>mcp/config.json (例)</h3>
            <pre class="code"><code>{
  "mcpServers": [
    {
      "name": "fal/flux/kontext/max",
      "type": "i2i",
      "baseUrl": "YOUR_BASE_URL/i2i/fal/flux/kontext/max"
    }
  ]
}</code></pre>
        </div>
    `,
    't2v-wan': `
        <h1 class="page-title">WAN 2.2-5b (Text-to-Video)</h1>
        <p class="page-subtitle">テキストから動画を生成</p>
        <div class="content">
            <h3>Endpoint</h3>
            <pre class="code"><code>/catalog/id/t2v/fal/wan/v2.2-5b/text-to-video</code></pre>
            <h3>mcp/config.json (例)</h3>
            <pre class="code"><code>{
  "mcpServers": [
    {
      "name": "fal/wan/v2.2-5b",
      "type": "t2v",
      "baseUrl": "YOUR_BASE_URL/t2v/fal/wan/v2.2-5b/text-to-video"
    }
  ]
}</code></pre>
        </div>
    `,
    'uploader': `
        <h1 class="page-title">Uploader (Service)</h1>
        <p class="page-subtitle">アセットのアップロード/配信を補助</p>
        <div class="content">
            <h3>Endpoint</h3>
            <pre class="code"><code>/catalog/id/uploader/fal</code></pre>
            <h3>mcp/config.json (例)</h3>
            <pre class="code"><code>{
  "mcpServers": [
    {
      "name": "fal/uploader",
      "type": "service",
      "baseUrl": "YOUR_BASE_URL/uploader/fal"
    }
  ]
}</code></pre>
        </div>
    `,
    'req-docs': `
        <h1 class="page-title">Requirements Docs</h1>
        <p class="page-subtitle">要件定義ドキュメント</p>
        <div class="content">
            <p>要件定義の詳細は別ページで管理しています。</p>
            <ul>
                <li>ローカル: requirements-doc/index.html を開く</li>
                <li>トップ画像: kamui-docs-ui-pattern2-gradient.png</li>
            </ul>
        </div>
    `,

    
    // MCP SaaS詳細ページ
    'playlist-storyboard': `
        <div class="page-header">
            <h1 class="page-title">絵コンテ・ビデオコンテ MCP SaaS</h1>
            <p class="page-subtitle">ストーリーボード作成用MCPサーバー</p>
            <div class="page-divider"></div>
        </div>
        
        <div class="playlist-detail-container">
            <div class="detail-section">
                <h2 class="section-title">JSON設定</h2>
                <pre class="code"><code>{
  "mcpServers": {
    "storyboard": {
      "type": "http",
      "url": "https://{baseurl}/storyboard"
    },
    "t2i-kamui-imagen4-ultra": {
      "type": "http",
      "url": "https://{baseurl}/t2i/fal/imagen4/ultra"
    },
    "i2i-kamui-flux-kontext-max": {
      "type": "http",
      "url": "https://{baseurl}/i2i/fal/flux/kontext/max"
    },
    "i2v-kamui-seedance-v1-lite": {
      "type": "http",
      "url": "https://{baseurl}/i2v/fal/bytedance/seedance-v1-lite"
    }
  }
}</code></pre>
            </div>
            
            <div class="detail-section">
                <h2 class="section-title">TOML設定</h2>
                <pre class="code"><code>[mcpServers.storyboard]
type = "http"
url = "https://{baseurl}/storyboard"

[mcpServers.t2i-kamui-imagen4-ultra]
type = "http"
url = "https://{baseurl}/t2i/fal/imagen4/ultra"

[mcpServers.i2i-kamui-flux-kontext-max]
type = "http"
url = "https://{baseurl}/i2i/fal/flux/kontext/max"

[mcpServers.i2v-kamui-seedance-v1-lite]
type = "http"
url = "https://{baseurl}/i2v/fal/bytedance/seedance-v1-lite"</code></pre>
            </div>
            
            <div class="detail-section">
                <h2 class="section-title">利用方法</h2>
                <div class="usage-content">
                    <h3>1. Claude Codeへの設定</h3>
                    <p>Claude Codeの設定ファイルに上記のJSONまたはTOMLを追加</p>
                    
                    <h3>2. ストーリーボード作成</h3>
                    <p>テキストから画像、画像から動画を生成してストーリーボードを作成</p>
                    
                    <h3>3. サーバー一覧</h3>
                    <ul>
                        <li><strong>storyboard</strong> - メインストーリーボードサーバー</li>
                        <li><strong>t2i-kamui-imagen4-ultra</strong> - 高品質画像生成</li>
                        <li><strong>i2i-kamui-flux-kontext-max</strong> - 画像編集/変換</li>
                        <li><strong>i2v-kamui-seedance-v1-lite</strong> - 画像から動画生成</li>
                    </ul>
                </div>
            </div>
            
            <div class="detail-section">
                <h2 class="section-title">イメージ</h2>
                <div class="image-gallery">
                    <div class="image-placeholder">
                        <p>画像パス: ./images/storyboard-sample.png</p>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h2 class="section-title">GitHub</h2>
                <div class="github-link">
                    <a href="https://github.com/kamuicode/mcp-storyboard" target="_blank" class="github-button">
                        <span>💙 GitHubリポジトリを見る</span>
                    </a>
                </div>
            </div>
        </div>
    `,
    
    'playlist-requirement': `
        <div class="page-header">
            <h1 class="page-title">要件定義 MCP SaaS</h1>
            <p class="page-subtitle">要件定義ドキュメント作成用MCPサーバー</p>
            <div class="page-divider"></div>
        </div>
        
        <div class="playlist-detail-container">
            <div class="detail-section">
                <h2 class="section-title">JSON設定</h2>
                <pre class="code"><code>{
  "mcpServers": {
    "requirement": {
      "type": "http",
      "url": "https://{baseurl}/requirement"
    },
    "t2i-kamui-imagen4-ultra": {
      "type": "http",
      "url": "https://{baseurl}/t2i/fal/imagen4/ultra"
    },
    "i2i-kamui-flux-kontext-max": {
      "type": "http",
      "url": "https://{baseurl}/i2i/fal/flux/kontext/max"
    },
    "i2i-kamui-flux-krea-lora": {
      "type": "http",
      "url": "https://{baseurl}/i2i/fal/flux-krea-lora/image-to-image"
    },
    "i2v-kamui-seedance-v1-lite": {
      "type": "http",
      "url": "https://{baseurl}/i2v/fal/bytedance/seedance-v1-lite"
    }
  }
}</code></pre>
            </div>
            
            <div class="detail-section">
                <h2 class="section-title">TOML設定</h2>
                <pre class="code"><code>[mcpServers.requirement]
type = "http"
url = "https://{baseurl}/requirement"

[mcpServers.t2i-kamui-imagen4-ultra]
type = "http"
url = "https://{baseurl}/t2i/fal/imagen4/ultra"

[mcpServers.i2i-kamui-flux-kontext-max]
type = "http"
url = "https://{baseurl}/i2i/fal/flux/kontext/max"

[mcpServers.i2i-kamui-flux-krea-lora]
type = "http"
url = "https://{baseurl}/i2i/fal/flux-krea-lora/image-to-image"

[mcpServers.i2v-kamui-seedance-v1-lite]
type = "http"
url = "https://{baseurl}/i2v/fal/bytedance/seedance-v1-lite"</code></pre>
            </div>
            
            <div class="detail-section">
                <h2 class="section-title">利用方法</h2>
                <div class="usage-content">
                    <h3>1. Claude Codeへの設定</h3>
                    <p>Claude Codeの設定ファイルに上記のJSONまたはTOMLを追加</p>
                    
                    <h3>2. 要件定義作成</h3>
                    <p>HTML形式で左サイドバーナビゲーション付きの要件定義ドキュメントを生成</p>
                    
                    <h3>3. サーバー一覧</h3>
                    <ul>
                        <li><strong>requirement</strong> - 要件定義ドキュメントジェネレータ</li>
                        <li><strong>t2i-kamui-imagen4-ultra</strong> - 高品質画像生成</li>
                        <li><strong>i2i-kamui-flux-kontext-max</strong> - 画像編集/変換</li>
                        <li><strong>i2i-kamui-flux-krea-lora</strong> - LoRA画像編集</li>
                        <li><strong>i2v-kamui-seedance-v1-lite</strong> - 画像から動画生成</li>
                    </ul>
                </div>
            </div>
            
            <div class="detail-section">
                <h2 class="section-title">イメージ</h2>
                <div class="image-gallery">
                    <div class="image-placeholder">
                        <p>画像パス: ./images/requirement-sample.png</p>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h2 class="section-title">GitHub</h2>
                <div class="github-link">
                    <a href="https://github.com/kamuicode/mcp-requirement" target="_blank" class="github-button">
                        <span>💙 GitHubリポジトリを見る</span>
                    </a>
                </div>
            </div>
        </div>
    `,
    
    'playlist-kamui-code': `
        <div class="page-header">
            <h1 class="page-title">KAMUI CODE MCP SaaS</h1>
            <p class="page-subtitle">フル機能搭載のMCPサーバーセット</p>
            <div class="page-divider"></div>
        </div>
        
        <div class="playlist-detail-container">
            <div class="detail-section">
                <h2 class="section-title">JSON設定（主要サーバーのみ抜粋）</h2>
                <pre class="code"><code>{
  "mcpServers": {
    "file-upload-kamui-fal": {
      "type": "http",
      "url": "https://{baseurl}/uploader/fal"
    },
    "t2i-kamui-imagen4-ultra": {
      "type": "http",
      "url": "https://{baseurl}/t2i/fal/imagen4/ultra"
    },
    "i2i-kamui-flux-kontext-max": {
      "type": "http",
      "url": "https://{baseurl}/i2i/fal/flux/kontext/max"
    },
    "t2v-kamui-veo3-fast": {
      "type": "http",
      "url": "https://{baseurl}/t2v/fal/veo3/fast"
    },
    "i2v-kamui-hailuo-02-pro": {
      "type": "http",
      "url": "https://{baseurl}/i2v/fal/minimax/hailuo-02/pro"
    },
    "v2v-kamui-luma-ray2": {
      "type": "http",
      "url": "https://{baseurl}/v2v/fal/luma/dream-machine/ray-2/modify"
    },
    "t2s-kamui-minimax-speech-25-turbo-preview": {
      "type": "http",
      "url": "https://{baseurl}/t2s/minimax/speech-2-5-turbo-preview"
    }
  }
  // ... 他48サーバー
}</code></pre>
            </div>
            
            <div class="detail-section">
                <h2 class="section-title">TOML設定（一部抜粋）</h2>
                <pre class="code"><code>[mcpServers.file-upload-kamui-fal]
type = "http"
url = "https://{baseurl}/uploader/fal"

[mcpServers.t2i-kamui-imagen4-ultra]
type = "http"
url = "https://{baseurl}/t2i/fal/imagen4/ultra"

[mcpServers.i2i-kamui-flux-kontext-max]
type = "http"
url = "https://{baseurl}/i2i/fal/flux/kontext/max"

# ... その他サーバー設定</code></pre>
            </div>
            
            <div class="detail-section">
                <h2 class="section-title">利用方法</h2>
                <div class="usage-content">
                    <h3>1. フル機能セットアップ</h3>
                    <p>55個のサーバーを一括でClaude Codeに追加</p>
                    
                    <h3>2. 主要機能</h3>
                    <ul>
                        <li><strong>画像生成 (T2I)</strong> - Imagen4, Flux, Dreamina, Qwen等</li>
                        <li><strong>画像編集 (I2I)</strong> - Kontext, Krea LoRA, AuraSR等</li>
                        <li><strong>動画生成 (T2V)</strong> - Veo3, WAN, Luma等</li>
                        <li><strong>画像から動画 (I2V)</strong> - Hailuo, Seedance, OmniHuman等</li>
                        <li><strong>動画編集 (V2V)</strong> - Luma Ray2, Pixverse, Runway等</li>
                        <li><strong>音声合成 (T2S)</strong> - MiniMax Speech 2.5 Turbo</li>
                        <li><strong>音楽生成 (T2M)</strong> - Google Lyria</li>
                        <li><strong>ファイルアップロード</strong> - FAL Storage</li>
                    </ul>
                    
                    <h3>3. 特徴</h3>
                    <ul>
                        <li>⭐ 全機能をカバーする統合パッケージ</li>
                        <li>🚀 最新モデルに対応</li>
                        <li>🔧 プロフェッショナル向け設計</li>
                    </ul>
                </div>
            </div>
            
            <div class="detail-section">
                <h2 class="section-title">イメージ</h2>
                <div class="image-gallery">
                    <div class="image-placeholder">
                        <p>画像パス: ./images/kamui-code-sample.png</p>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h2 class="section-title">GitHub</h2>
                <div class="github-link">
                    <a href="https://github.com/kamuicode/mcp-kamui-code" target="_blank" class="github-button">
                        <span>💙 GitHubリポジトリを見る</span>
                    </a>
                </div>
            </div>
        </div>
    `,

    };
})();

// ツリー型メニュー生成（requirements-doc のツリーUI風）
function generateMenu(items, container) {
    if (!container) return;
    container.innerHTML = '';

    function makeLeafNode(node) {
        const wrap = document.createElement('div');
        wrap.className = 'tree-item';
        const label = document.createElement('div');
        label.className = 'tree-label';
        label.dataset.page = node.id;
        const name = document.createElement('span');
        name.className = 'tree-name';
        name.textContent = `${node.label}`;
        label.appendChild(name);
        label.addEventListener('click', (e) => { e.preventDefault(); navigateTo(node.id); });
        wrap.appendChild(label);
        return wrap;
    }

    function makeGroupNode(group) {
        const wrap = document.createElement('div');
        wrap.className = 'tree-item';
        const label = document.createElement('div');
        label.className = 'tree-label category';
        label.dataset.page = group.id;
        const toggle = document.createElement('span');
        toggle.className = 'tree-toggle expanded';
        toggle.textContent = '▼';
        const name = document.createElement('span');
        name.className = 'tree-name';
        name.textContent = `${group.label}`;
        label.appendChild(toggle);
        label.appendChild(name);
        const children = document.createElement('div');
        children.className = 'tree-children expanded';

        (group.children || []).forEach(child => {
            if (child.type === 'group' && child.children && child.children.length) {
                // nested group
                const nestedGroup = makeGroupNode(child);
                children.appendChild(nestedGroup);
            } else if (child.children && child.children.length) {
                // menu with children
                const childWrap = document.createElement('div');
                childWrap.className = 'tree-item';
                const childLabel = document.createElement('div');
                childLabel.className = 'tree-label';
                childLabel.dataset.page = child.id;
                const childName = document.createElement('span');
                childName.className = 'tree-name';
                childName.textContent = `${child.label}`;
                childLabel.appendChild(childName);
                childLabel.addEventListener('click', (e) => { e.preventDefault(); navigateTo(child.id); });
                childWrap.appendChild(childLabel);
                const grand = document.createElement('div');
                grand.className = 'tree-children expanded';
                child.children.forEach(gc => {
                    const leaf = makeLeafNode(gc);
                    grand.appendChild(leaf);
                });
                childWrap.appendChild(grand);
                children.appendChild(childWrap);
            } else {
                const leaf = makeLeafNode(child);
                children.appendChild(leaf);
            }
        });

        label.addEventListener('click', (e) => {
            e.preventDefault();
            children.classList.toggle('expanded');
            toggle.textContent = children.classList.contains('expanded') ? '▼' : '▶';
            navigateTo(group.id);
        });

        wrap.appendChild(label);
        wrap.appendChild(children);
        return wrap;
    }

    items.forEach(item => {
        if (item.type === 'group' || (item.children && item.children.length)) {
            container.appendChild(makeGroupNode(item));
        } else {
            container.appendChild(makeLeafNode(item));
        }
    });
}

// ナビゲーション
function navigateTo(pageId) {
    const content = document.getElementById('content');
    
    // アクティブメニューの更新
    document.querySelectorAll('.tree-label').forEach(el => el.classList.remove('selected'));
    const activeItem = document.querySelector(`.tree-label[data-page="${pageId}"]`);
    if (activeItem) {
        activeItem.classList.add('selected');
        // 親コンテナを展開
        let parent = activeItem.parentElement;
        while (parent) {
            const tc = parent.closest('.tree-children');
            if (!tc) break;
            tc.classList.add('expanded');
            const parentLabel = tc.previousElementSibling;
            const t = parentLabel && parentLabel.querySelector ? parentLabel.querySelector('.tree-toggle') : null;
            if (t) t.textContent = '▼';
            parent = tc.parentElement;
        }
    }
    
    // コンテンツ表示
    content.innerHTML = pageContents[pageId] || `
        <h1 class="page-title">${pageId}</h1>
        <p class="page-subtitle">コンテンツ準備中...</p>
    `;
    
    // URLハッシュ更新
    window.location.hash = pageId;
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    const menuElement = document.getElementById('menu');
    generateMenu(menuData, menuElement);
    
    // テーマ初期化
    const themeDarkBtn = document.getElementById('themeDark');
    const themeLightBtn = document.getElementById('themeLight');
    function applyTheme(theme) {
        const mode = theme === 'light' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', mode);
        localStorage.setItem('theme', mode);
        if (themeDarkBtn && themeLightBtn) {
            themeDarkBtn.classList.toggle('active', mode === 'dark');
            themeLightBtn.classList.toggle('active', mode === 'light');
        }
    }
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(savedTheme || (prefersLight ? 'light' : 'dark'));
    themeDarkBtn && themeDarkBtn.addEventListener('click', () => applyTheme('dark'));
    themeLightBtn && themeLightBtn.addEventListener('click', () => applyTheme('light'));

    // モバイル用サイドバー開閉
    const sidebar = document.querySelector('.sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    const toggleBtn = document.getElementById('toggleSidebar');
    function closeSidebar(){ sidebar?.classList.remove('open'); backdrop?.classList.remove('show'); }
    function openSidebar(){ sidebar?.classList.add('open'); backdrop?.classList.add('show'); }
    toggleBtn && toggleBtn.addEventListener('click', () => {
        if (!sidebar) return;
        sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
    backdrop && backdrop.addEventListener('click', closeSidebar);

    // 検索（簡易ハイライト）
    const searchInput = document.getElementById('searchInput');
    function clearHighlights(root){
        root.querySelectorAll('mark.hl').forEach(m => {
            const text = document.createTextNode(m.textContent || '');
            m.parentNode && m.parentNode.replaceChild(text, m);
        });
    }
    function highlightTextNode(node, q){
        const text = node.nodeValue || '';
        const query = q.toLowerCase();
        const lower = text.toLowerCase();
        let pos = 0, idx = lower.indexOf(query, pos);
        if (idx === -1) return;
        const frag = document.createDocumentFragment();
        while (idx !== -1){
            const before = text.slice(pos, idx);
            if (before) frag.appendChild(document.createTextNode(before));
            const mark = document.createElement('mark');
            mark.className = 'hl';
            mark.textContent = text.slice(idx, idx + q.length);
            frag.appendChild(mark);
            pos = idx + q.length;
            idx = lower.indexOf(query, pos);
        }
        const after = text.slice(pos);
        if (after) frag.appendChild(document.createTextNode(after));
        node.parentNode && node.parentNode.replaceChild(frag, node);
    }
    function highlightIn(root, q){
        if (!q) return;
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach(n => highlightTextNode(n, q));
    }
    searchInput && searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim();
        const content = document.getElementById('content');
        if (!content) return;
        clearHighlights(content);
        if (q) highlightIn(content, q);
    });

    // ヘッダーボタン
    const reloadBtn = document.getElementById('reloadBtn');
    const toTopBtn = document.getElementById('toTop');
    reloadBtn && reloadBtn.addEventListener('click', () => location.reload());
    toTopBtn && toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    
    // 初期ページまたはハッシュからのページ表示
    const initialPage = window.location.hash.slice(1) || 'home';
    navigateTo(initialPage);
});

// ハッシュ変更の監視
window.addEventListener('hashchange', () => {
    const pageId = window.location.hash.slice(1) || 'home';
    navigateTo(pageId);
});
