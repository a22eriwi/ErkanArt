const paintings = [
  {
    id: 1,
    artist: 'Bertil',
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'l.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    artist: 'Bertil',
    name: 'Earthen Bottle',
    href: '#',
    price: '$343',
    imageSrc: './public/bild.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 3,
    artist: 'Bertil',
    name: 'Earthen Bottle',
    href: '#',
    price: '$343',
    imageSrc: './public/ja.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 4,
    artist: 'Bertil',
    name: 'Earthen Bottle',
    href: '#',
    price: '$343',
    imageSrc: './public/mkay.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
    {
    id: 6,
    artist: 'Bertil',
    name: 'Earthen Bottle',
    href: '#',
    price: '$343',
    imageSrc: './public/uu.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 5,
    artist: 'Bertil',
    name: 'Earthen Bottle',
    href: '#',
    price: '$343',
    imageSrc: './public/b.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 7,
    artist: 'Bertil',
    name: 'Earthen Bottle',
    href: '#',
    price: '$343',
    imageSrc: './public/yikes.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 8,
    artist: 'Bertil',
    name: 'Earthen Bottle',
    href: '#',
    price: '$343',
    imageSrc: './public/tv.png',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
    {
    id: 1,
    artist: 'Bertil',
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'p.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 9,
    artist: 'Bertil',
    name: 'Earthen Bottle',
    href: '#',
    price: '$343',
    imageSrc: './public/kra.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 10,
    artist: 'Bertil',
    name: 'Earthen Bottle',
    href: '#',
    price: '$343',
    imageSrc: './public/kra.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 7,
    artist: 'Bertil',
    name: 'Earthen Bottle',
    href: '#',
    price: '$343',
    imageSrc: './public/kl.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
    {
    id: 6,
    artist: 'Bertil',
    name: 'Earthen Bottle',
    href: '#',
    price: '$343',
    imageSrc: './public/a.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 8,
    artist: 'Bertil',
    name: 'Earthen Bottle',
    href: '#',
    price: '$343',
    imageSrc: './public/bra.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
    {
    id: 6,
    artist: 'Bertil',
    name: 'Earthen Bottle',
    href: '#',
    price: '$343',
    imageSrc: './public/b.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 9,
    artist: 'Bertil',
    name: 'Earthen Bottle',
    href: '#',
    price: '$343',
    imageSrc: './public/k.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
]

export default function Paintings() {
  return (
    <div>
      <div className="lg:max-w-[900px] xl:max-w-[1100px] m-auto px-5">
        {/* Masonry columns */}
        <div className="columns-2 sm:columns-3 lg:columns-3 xl:columns-4 gap-6 [column-fill:balance]">
          {paintings.map((painting) => (<a key={painting.id} href={painting.href} className="mb-6 break-inside-avoid block transform transition-transform duration-300 hover:scale-105 dark:bg-gray-800 bg-white shadow-lg rounded-lg overflow-hidden">
            <img alt={painting.imageAlt} src={painting.imageSrc} className="w-full h-auto object-cover" loading="lazy" />
            <section className="py-3 px-4">
              <h3 className="mt-1 text-sm font-semibold">{painting.artist}</h3>
              <h3 className="mt-1 text-sm">{painting.name}</h3>
              <p className="mt-3 text-sm font-bold">{painting.price}</p>
            </section>
          </a>
          ))}
        </div>
      </div>
    </div>
  )
}