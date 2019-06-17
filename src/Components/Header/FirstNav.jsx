import React, { Component } from 'react';
import logo from '../../Assets/Images/Logo_FootFem.gif'
import { NavLink } from 'react-router-dom';

class FirstNav extends Component {
  render() {
    return (
          <div className="firstNav">
            <img src={logo} />
            <nav>
              <ul>
                <li>
                  <NavLink to={this.props.routesList[0].path} activeClassName="active">
                      {this.props.routesList[0].name}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={this.props.routesList[1].path} activeClassName="active">
                      {this.props.routesList[1].name}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={this.props.routesList[2].path} activeClassName="active">
                      {this.props.routesList[2].name}
                  </NavLink>
                </li>
              </ul>
              <ul>
                <li>
                  <NavLink to={this.props.routesList[3].path} activeClassName="active">
                      {this.props.routesList[3].name}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={this.props.routesList[4].path} activeClassName="active">
                      {this.props.routesList[4].name}
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
    )
  }
}

export default FirstNav;
