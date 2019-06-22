import React, { Component } from 'react';
import homeImage from './../../Assets/Images/home.jpg';
import imgArticleDev from './../../Assets/Images/img_article_dev.jpg';
import {Link, Redirect} from 'react-router-dom';
import {routesList} from '../../Constantes/Routes.js';
import {API_ROUTE} from "../../Constantes/ApiRoute";

class Profil extends Component {
    state = {
        storage: null,
        teamList: null,
        teamCode: '',
    };

    componentWillMount() {
        // this.setState({storage: sessionStorage.getItem('userData')});
        // console.log(JSON.parse(this.state.storage));
        this.getStorageData();
    }

    teamCode() {
        switch (this.state.storage.team) {
            case 1: return 'FRA';
            case 2: return 'KOR';
            case 3: return 'NOR';
            case 4: return 'NGA';
            case 5: return 'GER';
            case 6: return 'CHN';
            case 7: return 'ESP';
            case 8: return 'RSA';
            case 9: return 'AUS';
            case 10: return 'ITA';
            case 11: return 'BRA';
            case 12: return 'JAM';
            case 13: return 'ENG';
            case 14: return 'SCO';
            case 15: return 'ARG';
            case 16: return 'JPN';
            case 17: return 'CAN';
            case 18: return 'CMR';
            case 19: return 'NZL';
            case 20: return 'NED';
            case 21: return 'USA';
            case 22: return 'THA';
            case 23: return 'CHI';
            case 24: return 'SWE';

        }
    }

    getStorageData() {
        const testData = JSON.parse(sessionStorage.getItem('userData'));
        console.log(sessionStorage.getItem('userData'));
        this.setState({storage: testData});
        console.log(testData);
    }

    render() {
        return (
            <div className="content-profil">
                <h1>{this.state.storage.firstname + ' ' + this.state.storage.lastname}</h1>

                <div className="lineData">
                    <span className="label">username </span><span className="labelData">{this.state.storage.username}</span>
                </div>
                <div className="lineData">
                    <span className="label">email </span><span className="labelData">{this.state.storage.email}</span>
                </div>
                <div className="lineData">
                    <span className="label">favorite team</span><img src={require("./../../Assets/Images/Flags/" + this.teamCode() + ".jpg")} width="40px" height="25px" alt="flag"/><span className="teamCode">{' ' + this.teamCode()}</span>
                </div>
            </div>
        )
    }
}

export default Profil;
