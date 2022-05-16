export function Card({ name, time }) {
  return (
    <div className="h-10 w-full items-center flex flex-row justify-between p-4 bg-violet-800 rounded text-white">
      <h2>{name}</h2>
      <small>{time}</small>
    </div>
  )
}