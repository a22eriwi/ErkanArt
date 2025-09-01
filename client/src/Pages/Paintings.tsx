import { imgUrl } from "../config.ts";

const paintings = [
  {
    id: 1,
    imageKey: "b.jpg",
    title: "Sunrise",
    artist: "John Doe",
    name: "Morning Glow",
  },
  {
    id: 2,
    imageKey: "bild.jpg",
    title: "Mountain",
    artist: "Jane Smith",
    name: "Majestic Peak",
  },
];

export default function Paintings() {
  return (
    <div>
      <div className="lg:max-w-[900px] xl:max-w-[1100px] m-auto px-5">
        {/* Masonry columns */}
        <div className="columns-2 sm:columns-3 lg:columns-3 xl:columns-4 gap-6 [column-fill:balance]">
          {paintings.map((painting) =>
            <a key={painting.id} className="mb-6 break-inside-avoid block transform transition-transform duration-300 hover:scale-105 dark:bg-gray-800 bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={imgUrl(painting.imageKey)} alt={painting.title} loading="lazy" className="w-full h-auto object-cover" />
              <section className="py-3 px-4">
                <h3 className="mt-1 text-sm font-semibold">{painting.artist}</h3>
                <h3 className="mt-1 text-sm">{painting.name}</h3>
              </section>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}