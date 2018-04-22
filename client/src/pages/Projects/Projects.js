import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
// import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Card, CardImg, CardText, CardBody, CardHeader, CardFooter, CardLink,
  CardTitle, CardSubtitle, Button } from "reactstrap";

class Projects extends Component {
  state = {
    projects: [],
    title: "",
    description: "",
    projectimage: ""
  };

  componentDidMount() {
    this.loadProjects();
  }

  loadProjects = () => {
    API.getProjects()
      .then(res => {
        this.setState({ projects: res.data, description: "" })
      })
      .catch(err => console.log(err));
  };

  deleteProject = id => {
    API.deleteProject(id)
      .then(res => this.loadProjects())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.description) {
      API.saveProject({
        title: this.state.title,
        description: this.state.description,
        projectimage: '../../images/image01.jpg'
      })
        .then(res => this.loadProjects())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description (required)"
              />
              <Button
                disabled={!(this.state.title && this.state.description)}
                onClick={this.handleFormSubmit}
              >
                Submit Project
              </Button>
            </form>
          </Col>
          {/* <Col size="md-6 sm-12"> */}
            {this.state.projects.length ? (
              <List>
                {this.state.projects.map(project => (
                  <ListItem key={project._id}>
                    <Card>
                      <CardHeader>{project.abbreviation}</CardHeader>
                      <CardImg top src={project.projectimage} alt="Project Image" />
                      {/* <CardImg top src={require({project.projectimage})} alt="Project Image" /> */}
                      {/* <CardImg top src={require('../../images/image01.jpg')} alt="Project Image" /> */}
                      <CardTitle>{project.title}</CardTitle>
                      <CardSubtitle>{project.projectimage}</CardSubtitle>
                      <CardLink>
                        <Link to={"/projects/" + project._id}>Link</Link>
                      </CardLink>
                      <CardBody>
                        <CardText>{project.description}</CardText>
                        <CardFooter>Status: {project.status} {project.status_date} </CardFooter>
                      </CardBody>
                    </Card>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          {/* </Col> */}
        </Row>
      </Container>
    );
  }
}

export default Projects;
