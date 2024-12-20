import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const PaginationContainer = () => {
  const { meta } = useLoaderData()
  const { numOfPages, page } = meta

  const navigate = useNavigate()
  const { pathname, search } = useLocation() // trả về query string

  const pages = Array.from({ length: numOfPages }, (_, i) => i + 1)

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNumber) // đặt giá trị cho params
    navigate(`${pathname}?${searchParams.toString()}`)
    // việc đưa ra response phù hợp với request sẽ do backend xử lý
  }

  if (numOfPages < 2) return null // nếu số trang bé hơn 2 thì kho hiển thị pagination container

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1
            if (prevPage < 1) prevPage = numOfPages
            handlePageChange(prevPage)
          }}
        >
          PREV
        </button>
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNumber === page && 'bg-base-300 border-base-300'
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        })}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1
            if (nextPage > numOfPages) nextPage = 1
            handlePageChange(nextPage)
          }}
        >
          NEXT
        </button>
      </div>
    </div>
  )
}
export default PaginationContainer
