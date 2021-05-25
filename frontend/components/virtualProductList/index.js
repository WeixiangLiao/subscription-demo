/* components/RestaurantList/index.js */
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Link from "next/link";

import {
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Row,
    Col,
} from "reactstrap";

const QUERY = gql`
{virtualProducts {id name description price priceId}}
`;

function VirtualProductList(props) {
    const { loading, error, data } = useQuery(QUERY);
    if (error) return "Error loading virtualProducts";
    //if virtualProducts are returned from the GraphQL query, run the filter query
    //and set equal to variable restaurantSearch
    if (loading) return <h1>Fetching</h1>;
    if (data.virtualProducts && data.virtualProducts.length) {
        //searchQuery
        const searchQuery = data.virtualProducts.filter((query) =>
            query.name.toLowerCase().includes(props.search)
        );
        if (searchQuery.length != 0) {
            return (
                <Row>
                    {searchQuery.map((virtualProduct) => (
                        <Col xs="6" sm="4" key={virtualProduct.id}>
                            <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                                <CardBody>
                                    <CardTitle>{virtualProduct.name}</CardTitle>
                                    <CardText>{virtualProduct.description}</CardText>
                                    <CardText>{'$'+virtualProduct.price +'/month'}</CardText>
                                </CardBody>
                                <div className="card-footer">
                                    <Link
                                        as={`/virtual-products/${virtualProduct.id}`}
                                        href={`/virtual-products?id=${virtualProduct.id}`}
                                    >
                                        <a className="btn btn-primary">View</a>
                                    </Link>
                                </div>
                            </Card>
                        </Col>
                    ))}

                    <style jsx global>
                        {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
            `}
                    </style>
                </Row>
            );
        } else {
            return <h1>No Virtual Products Found</h1>;
        }
    }
    return <h5>Add Virtual Products</h5>;
}
export default VirtualProductList;
