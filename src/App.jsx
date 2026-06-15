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
  Check
} from 'lucide-react';

function App() {
  const [downloadUrl, setDownloadUrl] = useState('https://github.com/Mr-Karaa/Usta-Core/releases/latest');
  const [version, setVersion] = useState('v2.1.8'); // Default to latest version
  const [isScrolled, setIsScrolled] = useState(false);
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.ustabalkon.app';

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

  return (
    <div className="App">
      {/* Decorative Orbs */}
      <div className="orb-glow orb-orange"></div>
      <div className="orb-glow orb-blue"></div>
      <div className="orb-glow orb-teal"></div>

      {/* Header */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-container">
            <a href="#" className="logo-wrapper">
              <div className="logo-icon">U</div>
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
            <h1 className="hero-title">
              İmalatçı Ustalar İçin <br />
              <span>Geleceğin Yazılım Çözümleri</span>
            </h1>
            <p className="hero-desc">
              Kağıt kalemle yapılan karmaşık hesaplara son verin. Usta Core yazılımları ile cam balkon ve PVC doğrama çizimlerini saniyeler içinde yapın, sıfır fireyle üretime geçin.
            </p>
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
                <h3>Usta Balkon</h3>
                <p>Cam balkon üreticileri ve montajcıları için geliştirilmiş profesyonel çizim, kesim ve maliyet hesaplama aracı.</p>
              </div>
              <ul className="product-features">
                <li>
                  <Check size={16} className="text-orange" style={{ color: 'var(--color-orange)' }} />
                  <span>İzometrik Görünüm:</span> Çizimi 3D ve canlı izleyin.
                </li>
                <li>
                  <Check size={16} className="text-orange" style={{ color: 'var(--color-orange)' }} />
                  <span>Kesim Optimizasyonu:</span> Profil firesini en aza indirin.
                </li>
                <li>
                  <Check size={16} className="text-orange" style={{ color: 'var(--color-orange)' }} />
                  <span>Otomatik PDF Rapor:</span> Anında fiyat teklifleri oluşturun.
                </li>
                <li>
                  <Check size={16} className="text-orange" style={{ color: 'var(--color-orange)' }} />
                  <span>Çevrimdışı Çalışma:</span> İnternetsiz dükkanda kullanın.
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
                <h3>Usta PVC</h3>
                <p>PVC doğrama, kapı ve pencere imalatçıları için hazırlanan, hatasız malzeme hesaplama ve teklif sistemi.</p>
              </div>
              <ul className="product-features">
                <li>
                  <Check size={16} className="text-blue" style={{ color: 'var(--color-blue)' }} />
                  <span>Pencere/Kapı Tasarımı:</span> Standart veya özel doğramalar.
                </li>
                <li>
                  <Check size={16} className="text-blue" style={{ color: 'var(--color-blue)' }} />
                  <span>Aksesuar & Vida Hesabı:</span> Gerekli tüm ekstraları bulun.
                </li>
                <li>
                  <Check size={16} className="text-blue" style={{ color: 'var(--color-blue)' }} />
                  <span>Maliyet Analizi:</span> Kar marjına göre anında fiyatlandırma.
                </li>
                <li>
                  <Check size={16} className="text-blue" style={{ color: 'var(--color-blue)' }} />
                  <span>Fire Yönetimi:</span> Alüminyum ve plastik firesini azaltın.
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
                <h3>Usta Defteri</h3>
                <p>Müşteri ilişkileri, şantiyedeki ölçüler ve iş durumlarının anlık takibi için tasarlanmış mobil tabanlı master yönetim sistemi.</p>
              </div>
              <ul className="product-features">
                <li>
                  <Check size={16} className="text-teal" style={{ color: 'var(--color-teal)' }} />
                  <span>Mobil Müşteri Kaydı:</span> Telefonunuzdan işleri kaydedin.
                </li>
                <li>
                  <Check size={16} className="text-teal" style={{ color: 'var(--color-teal)' }} />
                  <span>Anlık Bulut Senkronizasyonu:</span> Veriler kaybolmaz.
                </li>
                <li>
                  <Check size={16} className="text-teal" style={{ color: 'var(--color-teal)' }} />
                  <span>Balkon Uygulamasıyla Uyum:</span> Proje durumlarını senkronize edin.
                </li>
                <li>
                  <Check size={16} className="text-teal" style={{ color: 'var(--color-teal)' }} />
                  <span>Finans & Borç Alacak:</span> Ödemeleri kolayca takip edin.
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
              <a href="#" className="footer-logo">
                <div className="logo-icon" style={{ width: 28, height: 28, fontSize: '1.1rem', borderRadius: 7 }}>U</div>
                <div className="logo-text" style={{ fontSize: '1.25rem' }}>Usta<span>Core</span></div>
              </a>
              <p>İmalatçı ve montajcı ustaların iş süreçlerini dijitalleştirerek hata payını sıfıra düşüren ve verimliliği artıran yazılım ekosistemi.</p>
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
    </div>
  );
}

export default App;
