// Test script untuk verifikasi koneksi Supabase
// Jalankan di browser console: http://localhost:5176/login

// Test 1: Cek environment variables
console.log('🔍 Testing Supabase Connection...');
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

// Test 2: Cek Supabase client
try {
  // Import Supabase client (pastikan path benar)
  import('./src/lib/supabase.js').then(({ supabase }) => {
    console.log('✅ Supabase client loaded');

    // Test koneksi dengan query sederhana
    supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true })
      .then(({ count, error }) => {
        if (error) {
          console.error('❌ Database connection failed:', error.message);
          console.log('💡 Kemungkinan: Database belum di-setup atau RLS policies bermasalah');
        } else {
          console.log('✅ Database connection successful!');
          console.log('📊 Total profiles:', count);
        }
      });
  }).catch(err => {
    console.error('❌ Failed to load Supabase client:', err);
  });

} catch (error) {
  console.error('❌ Error testing Supabase:', error);
}

// Test 3: Quick auth test
setTimeout(() => {
  console.log('🔐 Testing auth state...');
  // This will be handled by the app automatically
}, 2000);

// Instructions
console.log(`
📋 LANGKAH SELANJUTNYA:
1. Jika semua ✅ → Database sudah OK, coba login
2. Jika ❌ → Ikuti TROUBLESHOOTING.md
3. Jika error RLS → Setup policies di database-setup.sql
4. Jika error connection → Cek .env.local dan Supabase project
`);
