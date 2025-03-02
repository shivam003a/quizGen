import React from 'react'

const Pagination = ({ page, setPage, totalPages }) => {

    const pageNumberButtons = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    )

    function getDisplayButtons() {
        const maxButtons = 5;
        let btnStartIndex = page - Math.floor(maxButtons / 2)
        let btnEndIndex = page + Math.floor(maxButtons / 2)

        if (btnStartIndex < 1) {
            btnStartIndex = 1;
            btnEndIndex = Math.min(totalPages, maxButtons)
        }
        if (btnEndIndex > totalPages) {
            btnEndIndex = totalPages
            btnStartIndex = Math.max(1, totalPages - maxButtons - 1)
        }

        return pageNumberButtons.slice(
            btnStartIndex - 1,
            btnEndIndex
        );
    }
    return (
        <div className='flex items-center justify-end gap-2 px-3 py-2 pb-30 curs'>
            <span
                className={`border py-1 px-3 font-poppins font-light bg-cs-blue text-white ${page === 1 ? 'cursor-not-allowed bg-cs-gray' : 'cursor-pointer'}`}
                onClick={() => setPage(Math.max(page - 1, 1))}
                disabled={page === 1}
            >
                Prev
            </span>
            {
                getDisplayButtons().map((value, index) => (
                    <span
                        key={index + 1}
                        className={`border py-1 px-3 font-poppins font-light cursor-pointer ${page === parseInt(value) ? "bg-cs-blue text-white border-cs-blue" : ""}`}
                        onClick={() => setPage(parseInt(value))}
                    >
                        {parseInt(value)}
                    </span>
                ))
            }
            <span
                className={`border py-1 px-3 font-poppins font-light bg-cs-blue text-white ${page === totalPages ? 'cursor-not-allowed bg-cs-gray' : 'cursor-pointer'}`}
                onClick={() => setPage(Math.min(page + 1, totalPages))}
                disabled={page === totalPages}
            >
                Next
            </span>
        </div>
    )
}

export default Pagination
