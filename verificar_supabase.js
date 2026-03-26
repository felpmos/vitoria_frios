const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = 'https://kkfiddvdbmzdantgkfjp.supabase.co'
const SUPABASE_KEY = 'YOUR_SUPABASE_KEY' // Usar chave secreta para ler tabela ignorando RLS

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function verify() {
  console.log('--- INICIANDO VERIFICAÇÃO NO SUPABASE ---')
  console.log('URL:', SUPABASE_URL)
  
  // Tenta ler 5 itens da tabela 'documents' (padrao do n8n vector store)
  const { data, error, count } = await supabase
    .from('documents')
    .select('*', { count: 'exact' })
    .limit(5)

  if (error) {
    if (error.code === 'PGRST116') {
      console.log('Tabela "documents" vazia ou não encontrada. Verificando outras tabelas...')
    } else {
      console.error('ERRO:', error.message)
      return
    }
  }

  if (data && data.length > 0) {
    console.log(`TOTAL DE REGISTROS NA TABELA: ${count}`)
    console.log('CONTEÚDO DA PRIMEIRA LINHA:', JSON.stringify(data[0], null, 2))
  } else {
    console.log('NENHUM DADO ENCONTRADO. Verifique se o workflow do n8n já foi executado com sucesso.')
  }
}

verify()
