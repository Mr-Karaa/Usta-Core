-- 1. Web sitesi içerik tablosunu oluştur
CREATE TABLE IF NOT EXISTS public.website_content (
    key TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Satır Seviyesi Güvenliği (RLS) etkinleştir
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;

-- 3. RLS Politikalarını oluştur
-- Herkesin yazıları okuyabilmesine izin ver (ziyaretçiler için)
DROP POLICY IF EXISTS "Allow public read access" ON public.website_content;
CREATE POLICY "Allow public read access" ON public.website_content
    FOR SELECT TO public USING (true);

-- Sadece giriş yapmış yetkili kullanıcıların (admin) güncelleme yapmasına izin ver
DROP POLICY IF EXISTS "Allow authenticated update access" ON public.website_content;
CREATE POLICY "Allow authenticated update access" ON public.website_content
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- 4. Varsayılan Türkçe yazıları içeri aktar (varsa üzerine yazmaz)
INSERT INTO public.website_content (key, content) VALUES
('hero_title', 'İmalatçı Ustalar İçin Geleceğin Yazılım Çözümleri'),
('hero_desc', 'Kağıt kalemle yapılan karmaşık hesaplara son verin. Usta Core yazılımları ile cam balkon ve PVC doğrama çizimlerini saniyeler içinde yapın, sıfır fireyle üretime geçin.'),
('product1_title', 'Usta Balkon'),
('product1_desc', 'Cam balkon üreticileri ve montajcıları için geliştirilmiş profesyonel çizim, kesim ve maliyet hesaplama aracı.'),
('product1_f1', 'İzometrik Görünüm:'),
('product1_f1_desc', 'Çizimi 3D ve canlı izleyin.'),
('product1_f2', 'Kesim Optimizasyonu:'),
('product1_f2_desc', 'Profil firesini en aza indirin.'),
('product1_f3', 'Otomatik PDF Rapor:'),
('product1_f3_desc', 'Anında fiyat teklifleri oluşturun.'),
('product1_f4', 'Çevrimdışı Çalışma:'),
('product1_f4_desc', 'İnternetsiz dükkanda kullanın.'),
('product2_title', 'Usta PVC'),
('product2_desc', 'PVC doğrama, kapı ve pencere imalatçıları için hazırlanan, hatasız malzeme hesaplama ve teklif sistemi.'),
('product2_f1', 'Pencere/Kapı Tasarımı:'),
('product2_f1_desc', 'Standart veya özel doğramalar.'),
('product2_f2', 'Aksesuar & Vida Hesabı:'),
('product2_f2_desc', 'Gerekli tüm ekstraları bulun.'),
('product2_f3', 'Maliyet Analizi:'),
('product2_f3_desc', 'Kar marjına göre anında fiyatlandırma.'),
('product2_f4', 'Fire Yönetimi:'),
('product2_f4_desc', 'Alüminyum ve plastik firesini azaltın.'),
('product3_title', 'Usta Defteri'),
('product3_desc', 'Müşteri ilişkileri, şantiyedeki ölçüler ve iş durumlarının anlık takibi için tasarlanmış mobil tabanlı master yönetim sistemi.'),
('product3_f1', 'Mobil Müşteri Kaydı:'),
('product3_f1_desc', 'Telefonunuzdan işleri kaydedin.'),
('product3_f2', 'Anlık Bulut Senkronizasyonu:'),
('product3_f2_desc', 'Veriler kaybolmaz.'),
('product3_f3', 'Balkon Uygulamasıyla Uyum:'),
('product3_f3_desc', 'Proje durumlarını senkronize edin.'),
('product3_f4', 'Finans & Borç Alacak:'),
('product3_f4_desc', 'Ödemeleri kolayca takip edin.'),
('footer_desc', 'İmalatçı ve montajcı ustaların iş süreçlerini dijitalleştirerek hata payını sıfıra düşüren ve verimliliği artıran yazılım ekosistemi.')
ON CONFLICT (key) DO NOTHING;
