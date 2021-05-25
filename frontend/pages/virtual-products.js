/* /pages/virtual-products.js */
import {useContext} from "react";
import {useQuery} from "@apollo/react-hooks";
import {useRouter} from "next/router";
import {gql} from "apollo-boost";


import Cart from "../components/cart/";
import AppContext from "../context/AppContext";

import {
    Button,
    Card,
    CardBody,
    CardText,
    CardTitle, Col, Row,

} from "reactstrap";

const GET_VirtualProduct_Detail = gql`
  query($id: ID!) {
    virtualProduct(id: $id) {
      id
      name
      description
      price
      priceId
    }
  }
`;

function VirtualProducts() {
    const appContext = useContext(AppContext);
    const router = useRouter();
    const {loading, error, data} = useQuery(GET_VirtualProduct_Detail, {
        variables: {id: router.query.id},
    });

    if (error) return "Error Loading Products";
    if (loading) return <h1>Loading ...</h1>;
    if (data.virtualProduct) {
        const {virtualProduct} = data;
        return (
            <>
                <Row>
                    <Col xs="6" sm="4" style={{padding: 0}}>
                        <Card style={{margin: "0 10px"}}>
                            <CardBody>
                                <CardTitle>{virtualProduct.name}</CardTitle>
                                <CardText>{virtualProduct.description}</CardText>
                                <CardText>{'$' + virtualProduct.price + '/month'}</CardText>
                            </CardBody>
                            <div className="card-footer">
                                <Button
                                    outline
                                    color="primary"
                                    onClick={() => appContext.addItem(virtualProduct)}
                                >
                                    + Subscribe
                                </Button>

                                <style jsx>
                                    {`
                                      a {
                                        color: white;
                                      }

                                      a:link {
                                        text-decoration: none;
                                        color: white;
                                      }

                                      .container-fluid {
                                        margin-bottom: 30px;
                                      }

                                      .btn-outline-primary {
                                        color: #007bff !important;
                                      }

                                      a:hover {
                                        color: white !important;
                                      }
                                    `}
                                </style>
                            </div>
                        </Card>
                    </Col>
                    <Col xs="3" style={{padding: 0}}>
                        <div>
                            <Cart/>
                        </div>
                    </Col>
                </Row>
            </>
        );
    }
    return <h1>Add VirtualProducts</h1>;
}

export default VirtualProducts;
