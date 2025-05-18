async function importPublicKey(pem) {
  const pemHeader = "-----BEGIN PUBLIC KEY-----"
  const pemFooter = "-----END PUBLIC KEY-----"
  const pemContents = pem
    .replace(pemHeader, "")
    .replace(pemFooter, "")
    .replace(/\s+/g, "")

  const binaryDer = base64ToArrayBuffer(pemContents)

  return await window.crypto.subtle.importKey(
    "spki",
    binaryDer,
    {
      name: "RSA-OAEP",
      hash: { name: "SHA-256" }
    },
    true,
    ["encrypt"]
  )
}

function base64ToArrayBuffer(base64) {
  const binaryString = atob(base64)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes.buffer
}

export async function rsaEncrypt(publicKeyStr, message) {
  const importedPublicKey = await importPublicKey(publicKeyStr)

  const encrypted = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    importedPublicKey,
    new TextEncoder().encode(message)
  )

  // 将加密后的二进制数据转换为 base64 字符串
  return btoa(String.fromCharCode.apply(null, new Uint8Array(encrypted)))
}

export async function SHA256(message) {
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(message)
  )
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
  return hashHex
}
