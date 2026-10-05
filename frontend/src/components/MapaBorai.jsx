import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const centroManaus = [-3.119, -60.0217]

const icones = {
  restaurante: '🍽️',
  cafeteria: '☕',
  bar: '🍺',
  evento: '🎵',
  hotel: '🧳',
  lazer: '🌳',
}

function criarIcone(categoria) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 40px;
        height: 40px;
        background: white;
        border: 3px solid #d4a937;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 3px 8px rgba(0,0,0,0.25);
      ">
        ${icones[categoria] || '📍'}
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  })
}

function MapaBorai({ estabelecimentos = [] }) {
  const locaisComCoordenadas = estabelecimentos.filter(
    (local) =>
      local.localizacao &&
      typeof local.localizacao.latitude === 'number' &&
      typeof local.localizacao.longitude === 'number'
  )

  return (
    <div
      style={{
        width: '100%',
        height: '320px',
        borderRadius: '20px',
        overflow: 'hidden',
      }}
    >
      <MapContainer
        center={centroManaus}
        zoom={12}
        scrollWheelZoom={true}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locaisComCoordenadas.map((local) => (
          <Marker
            key={local._id}
            position={[
              local.localizacao.latitude,
              local.localizacao.longitude,
            ]}
            icon={criarIcone(local.categoria)}
          >
            <Popup>
              <strong>{local.nome}</strong>
              <br />

              {local.bairro && (
                <>
                  {local.bairro}
                  <br />
                </>
              )}

              {local.cidade || 'Manaus'} - {local.estado || 'AM'}
              <br />

              {local.categoria && (
                <>
                  Categoria: {local.categoria}
                  <br />
                </>
              )}

              {local.quantidadeAvaliacoes > 0
                ? `⭐ ${local.avaliacao}`
                : 'Novo no Boraí'}
            </Popup>
          </Marker>
        ))}

        {locaisComCoordenadas.length === 0 && (
          <Marker
            position={centroManaus}
            icon={criarIcone('lazer')}
          >
            <Popup>
              <strong>Boraí</strong>
              <br />
              Manaus - AM
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}

export default MapaBorai