import React, { Component } from 'react';
import imgArticleDev from './../../Assets/Images/img_article_dev.jpg';

class Article extends Component {
  render() {
    return (
          <div className="content-article">
            <h1>Titre de l'article</h1>
            <div className="content-article-info">
              <img src={imgArticleDev} alt="img_article" />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placerat metus lacus, sed commodo tellus maximus egestas. Integer id orci at odio consectetur auctor. Mauris in tincidunt tellus. Praesent libero turpis, euismod at massa et, rutrum egestas enim. Pellentesque pharetra ex vitae hendrerit luctus. Praesent rhoncus ante ac lectus ultricies interdum. Mauris hendrerit odio dolor, ac pharetra erat fringilla vitae. Nam quis dui nec ligula porttitor ultrices. Vivamus convallis augue sed massa consequat, vel euismod lorem pretium. Sed sagittis metus ut dui rhoncus, nec ullamcorper augue tincidunt. Morbi vitae felis odio.

                Suspendisse rutrum, eros a molestie volutpat, ligula tellus sodales elit, ut malesuada turpis ex vitae metus. Phasellus quis dapibus sem. Vestibulum a eros vitae augue pharetra suscipit. Vivamus et libero enim. Nam ut faucibus felis. Vestibulum porttitor massa ac rutrum volutpat. Proin ac lectus efficitur, tempor nunc non, iaculis arcu. Morbi vitae blandit neque. Pellentesque eu iaculis lectus. Vestibulum efficitur mauris vel condimentum vulputate. In ipsum orci, volutpat a ligula ut, sollicitudin convallis ex. Phasellus sed ligula eu justo pharetra fringilla. Mauris aliquam vehicula porta. Etiam auctor porttitor luctus.
              </p>
            </div>
          </div>
    )
  }
}

export default Article;
