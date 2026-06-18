import { useState, useEffect } from 'react';
import { 
  Download, 
  ArrowRight, 
  Cpu, 
  Layers, 
  Smartphone, 
  CheckCircle2, 
  ShieldCheck, 
  Cloud, 
  Zap, 
  Laptop,
  Check,
  Pencil,
  LogOut,
  Lock
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Supabase client initialization
const supabaseUrl = 'https://rqcpcyreupulatwfordu.supabase.co';
const supabaseAnonKey = 'sb_publishable_pmSrQGl7GzRHKIQxoZoISQ_aUiWgjHf';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DEFAULT_TEXTS = {
  hero_title: 'İmalatçı Ustalar İçin <br /> <span>Geleceğin Yazılım Çözümleri</span>',
  hero_desc: 'Kağıt kalemle yapılan karmaşık hesaplara son verin. Usta Core yazılımları ile cam balkon ve PVC doğrama çizimlerini saniyeler içinde yapın, sıfır fireyle üretime geçin.',
  product1_title: 'Usta Balkon',
  product1_desc: 'Cam balkon üreticileri ve montajcıları için geliştirilmiş profesyonel çizim, kesim ve maliyet hesaplama aracı.',
  product1_f1: 'İzometrik Görünüm:',
  product1_f1_desc: 'Çizimi 3D ve canlı izleyin.',
  product1_f2: 'Kesim Optimizasyonu:',
  product1_f2_desc: 'Profil firesini en aza indirin.',
  product1_f3: 'Otomatik PDF Rapor:',
  product1_f3_desc: 'Anında fiyat teklifleri oluşturun.',
  product1_f4: 'Çevrimdışı Çalışma:',
  product1_f4_desc: 'İnternetsiz dükkanda kullanın.',
  product2_title: 'Usta PVC',
  product2_desc: 'PVC doğrama, kapı ve pencere imalatçıları için hazırlanan, hatasız malzeme hesaplama ve teklif sistemi.',
  product2_f1: 'Pencere/Kapı Tasarımı:',
  product2_f1_desc: 'Standart veya özel doğramalar.',
  product2_f2: 'Aksesuar & Vida Hesabı:',
  product2_f2_desc: 'Gerekli tüm ekstraları bulun.',
  product2_f3: 'Maliyet Analizi:',
  product2_f3_desc: 'Kar marjına göre anında fiyatlandırma.',
  product2_f4: 'Fire Yönetimi:',
  product2_f4_desc: 'Alüminyum ve plastik firesini azaltın.',
  product3_title: 'Usta Defteri',
  product3_desc: 'Müşteri ilişkileri, şantiyedeki ölçüler ve iş durumlarının anlık takibi için tasarlanmış mobil tabanlı master yönetim sistemi.',
  product3_f1: 'Mobil Müşteri Kaydı:',
  product3_f1_desc: 'Telefonunuzdan işleri kaydedin.',
  product3_f2: 'Anlık Bulut Senkronizasyonu:',
  product3_f2_desc: 'Veriler kaybolmaz.',
  product3_f3: 'Balkon Uygulamasıyla Uyum:',
  product3_f3_desc: 'Proje durumlarını senkronize edin.',
  product3_f4: 'Finans & Borç Alacak:',
  product3_f4_desc: 'Ödemeleri kolayca takip edin.',
  footer_desc: 'İmalatçı ve montajcı ustaların iş süreçlerini dijitalleştirerek hata payını sıfıra düşüren ve verimliliği artıran yazılım ekosistemi.'
};

function App() {
  const [downloadUrl, setDownloadUrl] = useState('https://github.com/Mr-Karaa/Usta-Core/releases/latest');
  const [version, setVersion] = useState('v2.1.8'); // Default to latest version
  const [isScrolled, setIsScrolled] = useState(false);
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.ustabalkon.app';

  // CMS States
  const [texts, setTexts] = useState(DEFAULT_TEXTS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [logoClicks, setLogoClicks] = useState(0);
  const [editingField, setEditingField] = useState(null); // { key, title }
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    // Scroll event listener for header styling
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Load texts from Supabase
    supabase.from('website_content').select('*')
      .then(({ data, error }) => {
        if (data && !error) {
          const dbTexts = {};
          data.forEach(item => {
            dbTexts[item.key] = item.content;
          });
          setTexts(prev => ({ ...prev, ...dbTexts }));
        }
      });

    // Check query params for admin mode
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setShowLoginModal(true);
      // Remove query param quietly
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && session.user && session.user.email === 'ustadefterr@gmail.com') {
        setIsAdmin(true);
        document.body.classList.add('admin-active');
      } else {
        setIsAdmin(false);
        document.body.classList.remove('admin-active');
      }
    });

    // Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user && session.user.email === 'ustadefterr@gmail.com') {
        setIsAdmin(true);
        document.body.classList.add('admin-active');
      } else {
        setIsAdmin(false);
        document.body.classList.remove('admin-active');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Dynamic download URL fetch from GitHub Releases with cache buster
    fetch('https://api.github.com/repos/Mr-Karaa/Usta-Core/releases/latest?t=' + new Date().getTime())
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('API request failed');
      })
      .then(data => {
        if (data.tag_name) {
          // Version comparison helper
          const clean = (v) => v.replace(/^v/, '').split('.').map(Number);
          const n = clean(data.tag_name);
          const o = clean('v2.1.8');
          let isNewerOrEqual = true;
          for (let i = 0; i < Math.max(n.length, o.length); i++) {
            const nv = n[i] || 0;
            const ov = o[i] || 0;
            if (nv > ov) { isNewerOrEqual = true; break; }
            if (nv < ov) { isNewerOrEqual = false; break; }
          }

          if (isNewerOrEqual) {
            setVersion(data.tag_name);
            // Find asset ending with .exe (e.g. Usta Balkon Setup 2.1.8.exe)
            const exeAsset = data.assets.find(asset => asset.name.endsWith('.exe') && asset.name.includes('Balkon'));
            if (exeAsset) {
              setDownloadUrl(exeAsset.browser_download_url);
            }
          }
        }
      })
      .catch(err => {
        console.warn('Fallback to release page, could not fetch direct exe URL:', err);
      });
  }, []);

  // CMS Handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoginError('Hatalı e-posta adresi veya şifre.');
    } else {
      setShowLoginModal(false);
      setEmail('');
      setPassword('');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    document.body.classList.remove('admin-active');
  };

  const handleEdit = (key, title, currentValue) => {
    setEditingField({ key, title });
    setEditingText(currentValue);
  };

  const handleSaveEdit = async () => {
    if (!editingField) return;
    const { key } = editingField;

    // Optimistically update locally
    setTexts(prev => ({ ...prev, [key]: editingText }));
    setEditingField(null);

    const { error } = await supabase
      .from('website_content')
      .upsert({ key, content: editingText });

    if (error) {
      console.error('Veritabanına kaydedilirken hata oluştu:', error);
      alert('Yazı veritabanına kaydedilemedi: ' + error.message);
    }
  };

  const handleLogoClick = () => {
    setLogoClicks(prev => {
      const nextClicks = prev + 1;
      if (nextClicks >= 5) {
        setShowLoginModal(true);
        return 0;
      }
      return nextClicks;
    });
  };

  // Reset clicks after 2 seconds of inactivity
  useEffect(() => {
    if (logoClicks > 0) {
      const t = setTimeout(() => setLogoClicks(0), 2000);
      return () => clearTimeout(t);
    }
  }, [logoClicks]);

  // Editable Text Component
  const EditableText = ({ id, tag: Tag = 'span', className = '' }) => {
    const content = texts[id] || DEFAULT_TEXTS[id] || '';
    
    if (!isAdmin) {
      return <Tag className={className} dangerouslySetInnerHTML={{ __html: content }} />;
    }

    return (
      <Tag className={`admin-editable-container ${className}`}>
        <span dangerouslySetInnerHTML={{ __html: content }} />
        <button 
          className="admin-edit-btn" 
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleEdit(id, id.replace(/_/g, ' ').toUpperCase(), content);
          }}
          title="Yazıyı Düzenle"
        >
          <Pencil size={12} />
        </button>
      </Tag>
    );
  };

  return (
    <div className="App">
      {/* Admin Toolbar */}
      {isAdmin && (
        <div className="admin-toolbar">
          <div className="admin-toolbar-title">
            <Lock size={14} style={{ marginRight: '6px' }} /> Usta Core Yönetici Paneli (Aktif)
          </div>
          <button onClick={handleLogout} className="admin-toolbar-btn" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <LogOut size={14} /> Çıkış Yap
          </button>
        </div>
      )}

      {/* Decorative Orbs */}
      <div className="orb-glow orb-orange"></div>
      <div className="orb-glow orb-blue"></div>
      <div className="orb-glow orb-teal"></div>

      {/* Header */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-container">
            <a href="#" className="logo-wrapper" onClick={(e) => { e.preventDefault(); handleLogoClick(); }}>
              <img src="/logo.jpg" alt="Usta Core Logo" className="logo-icon" style={{ objectFit: 'cover' }} />
              <div className="logo-text">Usta<span>Core</span></div>
            </a>
            <nav>
              <ul className="nav-links">
                <li><a href="#products" className="nav-link">Ürünler</a></li>
                <li><a href="#features" className="nav-link">Özellikler</a></li>
                <li><a href="#about" className="nav-link">Neden Biz?</a></li>
              </ul>
            </nav>
            <a href={downloadUrl} className="header-btn">Usta Balkon'u İndir</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-badge">
              <Zap size={14} /> En Yeni Sürüm: {version}
            </div>
            <EditableText id="hero_title" tag="h1" className="hero-title" />
            <EditableText id="hero_desc" tag="p" className="hero-desc" />
            <div className="hero-cta">
              <a href={downloadUrl} className="btn-primary">
                <Download size={18} /> Usta Balkon'u İndir (Win)
              </a>
              <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Smartphone size={18} /> Google Play (Android)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="products-section">
        <div className="container">
          <div className="section-header">
            <div className="section-subtitle">Ürün Portföyümüz</div>
            <h2 className="section-main-title">Ustalar İçin Geliştirilen Uygulamalar</h2>
          </div>

          <div className="products-grid">
            {/* Usta Balkon Card */}
            <div className="product-card featured">
              <span className="product-badge">Windows / Android</span>
              <div className="product-icon orange">
                <Laptop size={28} />
              </div>
              <div className="product-info">
                <h3><EditableText id="product1_title" /></h3>
                <p><EditableText id="product1_desc" /></p>
              </div>
              <ul className="product-features">
                <li>
                  <Check size={16} className="text-orange" style={{ color: 'var(--color-orange)' }} />
                  <span><EditableText id="product1_f1" /></span> <EditableText id="product1_f1_desc" />
                </li>
                <li>
                  <Check size={16} className="text-orange" style={{ color: 'var(--color-orange)' }} />
                  <span><EditableText id="product1_f2" /></span> <EditableText id="product1_f2_desc" />
                </li>
                <li>
                  <Check size={16} className="text-orange" style={{ color: 'var(--color-orange)' }} />
                  <span><EditableText id="product1_f3" /></span> <EditableText id="product1_f3_desc" />
                </li>
                <li>
                  <Check size={16} className="text-orange" style={{ color: 'var(--color-orange)' }} />
                  <span><EditableText id="product1_f4" /></span> <EditableText id="product1_f4_desc" />
                </li>
              </ul>
              <div className="product-action" style={{ display: 'flex', gap: '12px' }}>
                <a href={downloadUrl} className="btn-card orange" style={{ flex: 1 }}>
                  <Download size={16} /> Windows ({version})
                </a>
                <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className="btn-card outline" style={{ flex: 1 }}>
                  <Smartphone size={16} /> Google Play
                </a>
              </div>
            </div>

            {/* Usta PVC Card */}
            <div className="product-card">
              <span className="product-badge blue">Yakında</span>
              <div className="product-icon blue">
                <Layers size={28} />
              </div>
              <div className="product-info">
                <h3><EditableText id="product2_title" /></h3>
                <p><EditableText id="product2_desc" /></p>
              </div>
              <ul className="product-features">
                <li>
                  <Check size={16} className="text-blue" style={{ color: 'var(--color-blue)' }} />
                  <span><EditableText id="product2_f1" /></span> <EditableText id="product2_f1_desc" />
                </li>
                <li>
                  <Check size={16} className="text-blue" style={{ color: 'var(--color-blue)' }} />
                  <span><EditableText id="product2_f2" /></span> <EditableText id="product2_f2_desc" />
                </li>
                <li>
                  <Check size={16} className="text-blue" style={{ color: 'var(--color-blue)' }} />
                  <span><EditableText id="product2_f3" /></span> <EditableText id="product2_f3_desc" />
                </li>
                <li>
                  <Check size={16} className="text-blue" style={{ color: 'var(--color-blue)' }} />
                  <span><EditableText id="product2_f4" /></span> <EditableText id="product2_f4_desc" />
                </li>
              </ul>
              <div className="product-action">
                <button className="btn-card disabled" disabled>
                  Yakında Sizlerle
                </button>
              </div>
            </div>

            {/* Usta Defteri Card */}
            <div className="product-card">
              <span className="product-badge teal">Mobil / Bulut</span>
              <div className="product-icon teal">
                <Smartphone size={28} />
              </div>
              <div className="product-info">
                <h3><EditableText id="product3_title" /></h3>
                <p><EditableText id="product3_desc" /></p>
              </div>
              <ul className="product-features">
                <li>
                  <Check size={16} className="text-teal" style={{ color: 'var(--color-teal)' }} />
                  <span><EditableText id="product3_f1" /></span> <EditableText id="product3_f1_desc" />
                </li>
                <li>
                  <Check size={16} className="text-teal" style={{ color: 'var(--color-teal)' }} />
                  <span><EditableText id="product3_f2" /></span> <EditableText id="product3_f2_desc" />
                </li>
                <li>
                  <Check size={16} className="text-teal" style={{ color: 'var(--color-teal)' }} />
                  <span><EditableText id="product3_f3" /></span> <EditableText id="product3_f3_desc" />
                </li>
                <li>
                  <Check size={16} className="text-teal" style={{ color: 'var(--color-teal)' }} />
                  <span><EditableText id="product3_f4" /></span> <EditableText id="product3_f4_desc" />
                </li>
              </ul>
              <div className="product-action">
                <a href="https://usta-defter.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-card teal">
                  Web Sürümünü Kullan ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Details Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <div className="section-subtitle">Ortak Avantajlar</div>
            <h2 className="section-main-title">Neden Usta Core Teknolojileri?</h2>
          </div>

          <div className="features-grid">
            <div className="feature-box">
              <div className="feature-box-icon">
                <ShieldCheck size={28} />
              </div>
              <h4>Çevrimdışı Çalışma Gücü</h4>
              <p>İnternet bağlantınızın zayıf olduğu şantiyelerde veya dükkanlarda programlarımız durmaz. Tüm işlemlerinizi yerel olarak yapabilir, internet geldiğinde buluta yükleyebilirsiniz.</p>
            </div>

            <div className="feature-box">
              <div className="feature-box-icon">
                <Cloud size={28} />
              </div>
              <h4>Hızlı Bulut Senkronizasyonu</h4>
              <p>Masaüstü ve mobil uygulamalarımız Supabase gücüyle birbirine bağlıdır. Sahada aldığınız bir ölçü dükkanınızdaki masaüstü ekranda anında görünür.</p>
            </div>

            <div className="feature-box">
              <div className="feature-box-icon">
                <CheckCircle2 size={28} />
              </div>
              <h4>Sıfır Hata Payı</h4>
              <p>Cam boşluğu, baza payları, fitil kesimleri ve profil boyları sistemlerimiz tarafından milimetrik olarak otomatik hesaplanır. Hatalı kesim maliyetlerinden tasarruf edersiniz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-info">
              <a href="#" className="footer-logo" onClick={(e) => { e.preventDefault(); handleLogoClick(); }}>
                <img src="/logo.jpg" alt="Usta Core Logo" className="logo-icon" style={{ width: 28, height: 28, borderRadius: 7, objectFit: 'cover' }} />
                <div className="logo-text" style={{ fontSize: '1.25rem' }}>Usta<span>Core</span></div>
              </a>
              <EditableText id="footer_desc" tag="p" />
            </div>
            <div className="footer-links-group">
              <div className="footer-links">
                <h5>Hızlı Menü</h5>
                <ul>
                  <li><a href="#products">Ürünler</a></li>
                  <li><a href="#features">Özellikler</a></li>
                  <li><a href={downloadUrl}>Usta Balkon İndir</a></li>
                </ul>
              </div>
              <div className="footer-links">
                <h5>Yasal</h5>
                <ul>
                  <li><a href="/privacy-policy.html">Gizlilik Politikası</a></li>
                  <li><a href="/delete-account.html">Hesap Silme Talebi</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Usta Core. Tüm hakları saklıdır.</p>
            <div className="footer-bottom-links">
              <a href="mailto:destek@ustabalkon.com">İletişim: destek@ustabalkon.com</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Admin Login Modal */}
      {showLoginModal && (
        <div className="admin-modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Yönetici Girişi</h3>
            <p>Lütfen devam etmek için yönetici bilgilerinizi girin.</p>
            <form onSubmit={handleLogin} className="admin-modal-form">
              <div className="admin-input-group">
                <label className="admin-input-label">E-posta</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="admin-input" 
                  required 
                  placeholder="admin@ustacore.com"
                />
              </div>
              <div className="admin-input-group">
                <label className="admin-input-label">Şifre</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="admin-input" 
                  required 
                  placeholder="••••••••"
                />
              </div>
              {loginError && <div className="admin-error-msg">{loginError}</div>}
              <button type="submit" className="admin-submit-btn">Giriş Yap</button>
              <button type="button" onClick={() => { setShowLoginModal(false); setLoginError(''); }} className="admin-cancel-btn">İptal</button>
            </form>
          </div>
        </div>
      )}

      {/* Inline Editor Dialog */}
      {editingField && (
        <div className="admin-edit-popover-overlay" onClick={() => setEditingField(null)}>
          <div className="admin-edit-popover" onClick={(e) => e.stopPropagation()}>
            <h4>Metni Düzenle: {editingField.title}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px', textAlign: 'left' }}>
              İpucu: Paragrafı bölmek için <code>&lt;br /&gt;</code>, turuncu/renkli yapmak istediğiniz alanlar için <code>&lt;span&gt;metin&lt;/span&gt;</code> etiketlerini kullanabilirsiniz.
            </p>
            <textarea 
              value={editingText} 
              onChange={(e) => setEditingText(e.target.value)} 
              className="admin-edit-textarea"
              placeholder="Yeni metni yazın..."
            />
            <div className="admin-edit-actions">
              <button onClick={() => setEditingField(null)} className="admin-edit-cancel">İptal</button>
              <button onClick={handleSaveEdit} className="admin-edit-save">Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
