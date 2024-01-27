import React from 'react'

function AdminFooter() {
  return (
    <footer className="py-12">
        <div className="container">
          <div className="flex flex-wrap -mx-3">
            <div className="flex-shrink-0 w-full max-w-full mx-auto mb-6 text-center lg:flex-0 lg:w-8/12">
              <a
                href="javascript:;"
                target="_blank"
                className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12"
              >
                {" "}
                Company{" "}
              </a>
              <a
                href="javascript:;"
                target="_blank"
                className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12"
              >
                {" "}
                About Us{" "}
              </a>
              <a
                href="javascript:;"
                target="_blank"
                className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12"
              >
                {" "}
                Team{" "}
              </a>
              <a
                href="javascript:;"
                target="_blank"
                className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12"
              >
                {" "}
                Products{" "}
              </a>
              <a
                href="javascript:;"
                target="_blank"
                className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12"
              >
                {" "}
                Blog{" "}
              </a>
            </div>
            <div className="flex-shrink-0 w-full max-w-full mx-auto mt-2 mb-6 text-center lg:flex-0 lg:w-8/12">
              <a
                href="javascript:;"
                target="_blank"
                className="mr-6 text-slate-400"
              >
                <span className="text-lg fab fa-dribbble" />
              </a>
              <a
                href="javascript:;"
                target="_blank"
                className="mr-6 text-slate-400"
              >
                <span className="text-lg fab fa-twitter" />
              </a>
              <a
                href="javascript:;"
                target="_blank"
                className="mr-6 text-slate-400"
              >
                <span className="text-lg fab fa-instagram" />
              </a>
              <a
                href="javascript:;"
                target="_blank"
                className="mr-6 text-slate-400"
              >
                <span className="text-lg fab fa-pinterest" />
              </a>
              <a
                href="javascript:;"
                target="_blank"
                className="mr-6 text-slate-400"
              >
                <span className="text-lg fab fa-github" />
              </a>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-8/12 max-w-full px-3 mx-auto mt-1 text-center flex-0">
              <p className="mb-0 text-slate-400">Copyright © ElderCare</p>
            </div>
          </div>
        </div>
      </footer>
    
 
  )
}

export default AdminFooter