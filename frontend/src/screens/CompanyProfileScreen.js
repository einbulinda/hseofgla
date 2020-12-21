import React from "react";

export default function CompanyProfileScreen() {
  return (
    <div className="profile m-5">
      <h1 className="m-2 p-4">About Us</h1>
      <div className="row">
        <div className="col-md-6 col-sm-6 col-xs-12 p-5 m-3 mission text-center">
          <h2 className="px-5">Our Mission</h2>
          <p className="px-5">
            To provide a range of products that seek to satisfy clientele's rich
            taste and needs for families across Kenya.
          </p>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12 p-5 m-3 vision text-center">
          <h2>Our Vision</h2>
          <p>
            Create Happy Homes. Happy families.
            <br />
            Happy You…all from good Kitchen & Home items.
          </p>
        </div>
      </div>
    </div>
  );
}
