import React from "react";

const SourceVisitors = () => {
  return (
    <div className='col-xxl-6'>
      <div className='card h-100'>
        <div className='card-header border-bottom-0 pb-0 d-flex align-items-center flex-wrap gap-2 justify-content-between'>
          <h6 className='mb-2 fw-bold text-lg mb-0'>Access Source Distribution</h6>
          <select className='form-select form-select-sm w-auto bg-base border text-secondary-light'>
            <option>Last Month</option>
            <option>Last Week</option>
            <option>Last Year</option>
          </select>
        </div>
        <div className='card-body'>
          <div className='position-relative h-100 min-h-320-px'>
            <div className='md-position-absolute start-0 top-0 mt-20'>
              <h6 className='mb-1'>524,756</h6>
              <span className='text-secondary-light'>
                Total sources Visitors
              </span>
            </div>
            <div className='row g-3 h-100'>
              <div className='col-md-3 col-sm-6 d-flex flex-column justify-content-end'>
                <div
                  className='d-flex flex-column align-items-center p-24 pt-16 rounded-top-4 bg-tb-warning'
                  style={{ minHeight: "50%" }}
                >

                  <span className='text-secondary-light'>Internal Access</span>
                  <h6 className='mb-0'>50%</h6>
                </div>
              </div>
              <div className='col-md-3 col-sm-6 d-flex flex-column justify-content-end'>
                <div
                  className='d-flex flex-column align-items-center p-24 pt-16 rounded-top-4 bg-tb-lilac'
                  style={{ minHeight: "66%" }}
                >
                  <span className='text-secondary-light'>External Access</span>
                  <h6 className='mb-0'>66%</h6>
                </div>
              </div>
              <div className='col-md-3 col-sm-6 d-flex flex-column justify-content-end'>
                <div
                  className='d-flex flex-column align-items-center p-24 pt-16 rounded-top-4 bg-tb-primary'
                  style={{ minHeight: "82%" }}
                >
                  <span className='text-secondary-light'>After Hours Access</span>
                  <h6 className='mb-0'>82%</h6>
                </div>
              </div>
              <div className='col-md-3 col-sm-6 d-flex flex-column justify-content-end'>
                <div
                  className='d-flex flex-column align-items-center p-24 pt-16 rounded-top-4 bg-tb-success'
                  style={{ minHeight: "96%" }}
                >
                  <span className='text-secondary-light'>Device Usage</span>
                  <h6 className='mb-0'>96%</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceVisitors;
