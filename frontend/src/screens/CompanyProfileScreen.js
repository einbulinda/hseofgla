import React from "react";

export default function CompanyProfileScreen() {
  return (
    <div>
      <h1>About Us</h1>
      <div className="row">
        <div className="col-md-6 col-sm-6 col-xs-12 text-justify">
          <h2>Our Mission</h2>
          <p>
            To provide a range of products that seek to satisfy clientele's rich
            taste and needs for families across Kenya.
          </p>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
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
