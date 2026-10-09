// Prepara uma foto JPEG pequena para salvar no perfil da conta.
export async function prepareProfilePhoto(file) {
  if (!file || !['image/jpeg','image/png','image/webp'].includes(file.type)) throw new Error('Escolha uma foto JPG, PNG ou WebP.')
  if (file.size > 8 * 1024 * 1024) throw new Error('Escolha uma foto de até 8 MB.')
  const url = URL.createObjectURL(file)
  try {
    const img = new Image()
    await new Promise((resolve,reject) => {img.onload=resolve;img.onerror=() => reject(new Error('Não foi possível abrir esta foto.'));img.src=url})
    const canvas = document.createElement('canvas')
    canvas.width = 256; canvas.height = 256
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Não foi possível preparar a foto neste navegador.')
    ctx.fillStyle = '#f1f6ed';ctx.fillRect(0,0,256,256)
    const side = Math.min(img.naturalWidth,img.naturalHeight)
    ctx.drawImage(img,(img.naturalWidth-side)/2,(img.naturalHeight-side)/2,side,side,0,0,256,256)
    return canvas.toDataURL('image/jpeg',.85)
  } finally {URL.revokeObjectURL(url)}
}
