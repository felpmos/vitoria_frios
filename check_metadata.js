const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = 'https://kkfiddvdbmzdantgkfjp.supabase.co'
const SUPABASE_KEY = 'YOUR_SUPABASE_KEY'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function verify() {
  const { data, error } = await supabase
    .from('documents')
    .select('content, metadata')
    .limit(3)

  if (error) {
    console.error('ERRO:', error.message)
    return
  }

  console.log('--- VERIFICANDO METADADOS ---')
  data.forEach((row, i) => {
    console.log(`\nITEM ${i+1}:`)
    console.log(`Content: ${row.content}`)
    console.log('Metadados (campos):', Object.keys(row.metadata || {}).join(', '))
    if (row.metadata?.venda_din_pix) {
      console.log(`Venda Din Pix: ${row.metadata.venda_din_pix}`)
    } else {
      console.log('Alerta: venda_din_pix NÃO ENCONTRADO nos metadados deste item.')
    }
  })
}

verify()
