import "./style.css"

export default function Page() {
  return (
    <>
      <div className="fixed">
        <video style={{ height: "70vh", width: "auto" }} controls src='/beerchallenge.mp4' />
      </div>
    </>
  )
}