import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="flex flex-col md:flex-row  justify-center items-center md:items-start gap-20 py-16 mt-10">
      <img src="/logo.png" alt="Logo" className="h-24 w-auto flex-shrink-0" />
      <div className="text max-w-md">
        <h3 className="text-[2rem] font-bold tracking-[-0.04rem] leading-[1.125] antialiased mb-5 text-brand">İletişim</h3>
        <h4 className="font-semibold">KONUM</h4>
        <p className="mb-4">
          musalla bağları mahallesi ruhi bağdadi sokak no:38/2 selçuklu / konya Türkiye
        </p>
        <h4 className="font-semibold mb-2">Telefon</h4>
        <p className="mb-4">+90 543 885 1200</p>
        <h4 className="font-semibold mb-2">E-posta</h4>
        <p>info@tarvina.com</p>
      </div>
    </footer>
    </>
  )
}

export default Footer
