import './App.css'
import logoBorai from './assets/logo-borai-valida.png'

const categorias = [
  'Restaurantes',
  'Bares',
  'Eventos',
  'Cinemas',
  'Teatros',
  'Museus',
  'Passeios',
  'Shoppings',
]

const recomendacoes = [
  {
    nome: 'Passeio pelo Centro Histórico',
    categoria: 'Passeio',
    localizacao: 'Centro, Manaus',
    motivo: 'Combina com seu interesse por cultura e experiências locais.',
  },
  {
    nome: 'Restaurante Regional',
    categoria: 'Restaurante',
    localizacao: 'Adrianópolis, Manaus',
    motivo:
      'Recomendado com base na sua localização e preferência por gastronomia.',
  },
  {
    nome: 'Evento Cultural',
    categoria: 'Evento',
    localizacao: 'Manaus',
    motivo:
      'Selecionado pelo contexto atual e pelas suas preferências.',
  },
]

function App() {
  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <img
            src={logoBorai}
            className="brand-logo"
            alt="Logo Boraí"
          />
        </div>

        <nav className="nav" aria-label="Navegação principal">
          <a href="#inicio">Início</a>
          <a href="#explorar">Explorar</a>
          <a href="#perfil">Perfil</a>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="inicio">
          <div className="hero-content">
            <span className="eyebrow">
              Descubra Manaus do seu jeito
            </span>

            <h2>
              Encontre lugares e experiências que combinam com você.
            </h2>

            <p>
              O Boraí considera suas preferências, localização e contexto para
              apresentar recomendações personalizadas.
            </p>

            <div className="search-box">
              <input
                type="text"
                placeholder="O que você quer fazer hoje?"
                aria-label="Buscar lugares, eventos ou experiências"
              />

              <button type="button">
                Buscar
              </button>
            </div>
          </div>

          <aside className="context-panel">
            <span className="context-label">
              Seu contexto agora
            </span>

            <h3>Manaus • Agora</h3>

            <div className="context-items">
              <div>
                <span>Localização</span>
                <strong>Manaus - AM</strong>
              </div>

              <div>
                <span>Preferência</span>
                <strong>Cultura e gastronomia</strong>
              </div>

              <div>
                <span>Categoria</span>
                <strong>Explorar</strong>
              </div>
            </div>

            <button
              type="button"
              className="secondary-button"
            >
              Ajustar preferências
            </button>
          </aside>
        </section>

        <section className="section" id="explorar">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                Explore por categoria
              </span>

              <h2>
                O que combina com o seu momento?
              </h2>
            </div>
          </div>

          <div className="category-grid">
            {categorias.map((categoria) => (
              <button
                className="category-card"
                type="button"
                key={categoria}
              >
                {categoria}
              </button>
            ))}
          </div>
        </section>

        <section className="section recommendations-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                Recomendado para você
              </span>

              <h2>
                Algumas opções para começar
              </h2>
            </div>

            <button
              type="button"
              className="link-button"
            >
              Ver todas
            </button>
          </div>

          <div className="recommendation-grid">
            {recomendacoes.map((recomendacao) => (
              <article
                className="recommendation-card"
                key={recomendacao.nome}
              >
                <div className="card-tag">
                  {recomendacao.categoria}
                </div>

                <h3>{recomendacao.nome}</h3>

                <p className="location">
                  {recomendacao.localizacao}
                </p>

                <p>
                  {recomendacao.motivo}
                </p>

                <div className="card-actions">
                  <button type="button">
                    Ver detalhes
                  </button>

                  <button
                    type="button"
                    className="ghost-button"
                  >
                    Salvar
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App