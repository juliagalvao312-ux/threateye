import { useEffect, useState } from 'react'
import './App.css'

const icons = {
  home: '⌂',
  files: '▤',
  assistant: '✦',
  settings: '⚙',
  help: '?',
  upload: '↥',
  send: '➤',
  plus: '+',
}

function Logo() {
  return <div className="brand"><span className="brand-mark">✦</span><span>THREAT</span><small>EYE</small></div>
}

function Sidebar({ active, onChange }) {
  const items = [
    ['home', 'Início'],
    ['files', 'Arquivos'],
    ['assistant', 'Assistente'],
    ['settings', 'Configurações'],
  ]
  return (
    <aside className="sidebar">
      <Logo />
      <div className="workspace-switcher"><span className="workspace-dot" /> Meu workspace <span>⌄</span></div>
      <nav>
        <p className="nav-label">MENU</p>
        {items.map(([id, label]) => (
          <button className={`nav-item ${active === id ? 'active' : ''}`} key={id} onClick={() => onChange(id)}>
            <span className="nav-icon">{icons[id]}</span>{label}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className={`nav-item ${active === 'help' ? 'active' : ''}`} onClick={() => onChange('help')}><span className="nav-icon">{icons.help}</span>Ajuda</button>
        <div className="profile"><div className="avatar">PD</div><div><strong>Pedro Dourado</strong><small>Administrador</small></div><span>•••</span></div>
      </div>
    </aside>
  )
}

function UploadCard({ onUploaded }) {
  const [dragging, setDragging] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const upload = () => { setUploaded(true); onUploaded?.() }
  return (
    <section className="upload-card">
      <div className="section-heading"><div><p className="eyebrow">BASE DE CONHECIMENTO</p><h2>Adicione seus arquivos</h2><p className="muted">Envie documentos para a SULAVI analisar e responder com contexto.</p></div><button className="text-button">Ver instruções <span>↗</span></button></div>
      <div className={`drop-zone ${dragging ? 'dragging' : ''} ${uploaded ? 'uploaded' : ''}`} onDragOver={(event) => { event.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); upload() }} onClick={upload}>
        <span className="upload-icon">{uploaded ? '✓' : icons.upload}</span>
        <strong>{uploaded ? 'Arquivo adicionado!' : 'Arraste seu arquivo aqui'}</strong>
        <span>{uploaded ? 'A SULAVI já pode usar este conteúdo.' : 'ou clique para procurar no seu computador'}</span>
        {!uploaded && <button className="purple-button" type="button">Selecionar arquivo</button>}
        <small>PDF, DOCX, TXT ou CSV · até 20 MB</small>
      </div>
      <div className="file-row"><div className="file-type">PDF</div><div className="file-info"><strong>Manual de atendimento ao cliente.pdf</strong><span>Adicionado há 2 minutos · 2.4 MB</span></div><span className="status">Processado</span><button className="more">•••</button></div>
    </section>
  )
}

function Home({ goAssistant }) {
  return <div className="page-content">
    <header className="topbar"><div><p className="breadcrumb">Workspace / Início</p><h1>Olá, Pedro!</h1><p className="muted">O que você gostaria de fazer hoje?</p></div><div className="top-actions"><button className="icon-button">⌕</button><button className="notification">♢<i /></button><div className="top-avatar">PD</div></div></header>
    <div className="welcome-banner"><div><span className="banner-kicker">SULAVI ASSISTENTE</span><h2>Conhecimento que trabalha<br /><em>por você.</em></h2><p>Converse com seus documentos, encontre respostas<br />e tome decisões com mais confiança.</p><button className="purple-button" onClick={goAssistant}>Conversar com a SULAVI <span>→</span></button></div><div className="banner-orb"><span>✦</span></div></div>
    <UploadCard />
    <section className="lower-grid"><div className="stat-card"><span className="stat-icon">▤</span><div><strong>1</strong><span>arquivo processado</span></div><small>↗ 100% <b>este mês</b></small></div><div className="stat-card"><span className="stat-icon">✦</span><div><strong>12</strong><span>perguntas respondidas</span></div><small>↗ 24% <b>este mês</b></small></div><div className="tips-card"><span className="tip-icon">✧</span><div><strong>Comece uma conversa</strong><span>A SULAVI está pronta para ajudar você.</span></div><button onClick={goAssistant}>→</button></div></section>
  </div>
}

function Assistant() {
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const send = () => { if (message.trim()) { setSent(true); setMessage('') } }
  return <div className="page-content assistant-page">
    <header className="topbar compact"><div><p className="breadcrumb">Workspace / Assistente</p><h1>Assistente</h1></div><div className="top-actions"><span className="online"><i /> SULAVI online</span><div className="top-avatar">PD</div></div></header>
    <div className="assistant-shell"><div className="assistant-intro"><div className="sona-avatar"><span>✦</span><i /><b /></div><p className="eyebrow">SUA INTELIGÊNCIA ARTIFICIAL</p><h2>Olá! Eu sou a SULAVI.</h2><p>Estou aqui para ajudar você a encontrar respostas, analisar informações<br />e transformar seus dados em decisões inteligentes.</p></div>
      {sent && <div className="sent-message">Você: Sua mensagem foi recebida. A SULAVI vai analisar seus documentos.</div>}
      <div className="suggestions"><button onClick={() => setMessage('Resuma os principais pontos dos meus arquivos')}>◈ <span>Resuma meus arquivos</span></button><button onClick={() => setMessage('Quais são os principais insights?')}>◌ <span>Encontre insights importantes</span></button><button onClick={() => setMessage('Ajude-me a analisar estes dados')}>✧ <span>Analise meus dados</span></button></div>
      <p className="prompt-hint">✦ Sugestões para começar</p>
      <div className="chat-input"><input value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && send()} placeholder="Converse com seus arquivos..." /><button className="input-action">⌘</button><button className="send-button" onClick={send}>{icons.send}</button></div><small className="privacy-note">A SULAVI pode cometer erros. Verifique informações importantes.</small>
    </div>
  </div>
}

function PageHeader({ section, title, description }) {
  return <header className="topbar"><div><p className="breadcrumb">Workspace / {section}</p><h1>{title}</h1>{description && <p className="muted">{description}</p>}</div><div className="top-actions"><button className="icon-button">⌕</button><button className="notification">♢<i /></button><div className="top-avatar">PD</div></div></header>
}

function Files() {
  return <div className="page-content"><PageHeader section="Arquivos" title="Arquivos" description="Gerencie os documentos que alimentam a inteligência da SULAVI." /><UploadCard /><section className="files-info-card"><span className="tip-icon">✦</span><div><h2>Organize sua base de conhecimento</h2><p className="muted">Arquivos processados ficam disponíveis para consulta no Assistente.</p></div><button className="purple-button">+ Adicionar arquivo</button></section></div>
}

function Settings() {
  return <div className="page-content"><PageHeader section="Configurações" title="Configurações" description="Personalize seu workspace e sua experiência com a SULAVI." /><section className="settings-card"><div className="settings-title"><span className="settings-icon">⚙</span><div><h2>Preferências do workspace</h2><p className="muted">Essas configurações se aplicam a todos os seus arquivos.</p></div></div><label className="setting-row"><span><strong>Nome do workspace</strong><small>Como seu workspace será identificado.</small></span><input defaultValue="Meu workspace" /></label><label className="setting-row"><span><strong>Respostas detalhadas</strong><small>Receba respostas com mais contexto e referências.</small></span><input className="toggle" type="checkbox" defaultChecked /></label><label className="setting-row"><span><strong>Notificações</strong><small>Receba atualizações sobre o processamento de arquivos.</small></span><input className="toggle" type="checkbox" defaultChecked /></label><button className="purple-button settings-save">Salvar alterações</button></section></div>
}

function Help() {
  const questions = ['Como adicionar um arquivo?', 'Quais formatos são aceitos?', 'Como conversar com meus documentos?', 'Meus dados estão seguros?']
  return <div className="page-content"><PageHeader section="Ajuda" title="Como podemos ajudar?" description="Encontre respostas rápidas para começar a usar a SULAVI." /><section className="help-card"><div className="help-search">⌕<input placeholder="Busque uma dúvida..." /></div><div className="faq-list">{questions.map((question) => <button key={question} className="faq-row"><span>{question}</span><b>+</b></button>)}</div><div className="help-contact"><span>✦</span><div><strong>Não encontrou o que precisava?</strong><small>Fale com nosso suporte e responderemos em breve.</small></div><button className="text-button">Entrar em contato →</button></div></section></div>
}

const routes = {
  home: '/',
  files: '/arquivos',
  assistant: '/assistente',
  settings: '/configuracoes',
  help: '/ajuda',
}

function routeFromPath(pathname) {
  return Object.entries(routes).find(([, path]) => path === pathname)?.[0] || 'home'
}

function App() {
  const [active, setActive] = useState(() => routeFromPath(window.location.pathname))

  useEffect(() => {
    const handlePopState = () => setActive(routeFromPath(window.location.pathname))
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (nextRoute) => {
    const nextPath = routes[nextRoute]
    if (nextPath !== window.location.pathname) window.history.pushState({}, '', nextPath)
    setActive(nextRoute)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const page = {
    home: <Home goAssistant={() => navigate('assistant')} />,
    files: <Files />,
    assistant: <Assistant />,
    settings: <Settings />,
    help: <Help />,
  }[active]

  return <div className="app-shell"><Sidebar active={active} onChange={navigate} /><main className="main-area">{page}</main></div>
}

export default App
