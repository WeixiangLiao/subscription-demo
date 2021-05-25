/* /pages/index.js */
import React, { useState } from "react";

import { Col, Input, InputGroup, InputGroupAddon, Row } from "reactstrap";
import RestaurantList from "../components/RestaurantList";
import VirtualProductList from "../components/virtualProductList";

function Home() {
    const [query, updateQuery] = useState("");
    return (
        <div className="container-fluid">
            <Row>
                <Col>
                    <div className="search">
                        <InputGroup>
                            <InputGroupAddon addonType="append"> Search </InputGroupAddon>
                            <Input
                                onChange={e => updateQuery(e.target.value.toLocaleLowerCase())}
                                value={query}
                            />
                        </InputGroup>
                    </div>
                    <VirtualProductList search={query} />
                </Col>
            </Row>
            <style jsx>
                {`
          .search {
            margin: 20px;
            width: 500px;
          }
        `}
            </style>
        </div>
    );
}
export default Home;
