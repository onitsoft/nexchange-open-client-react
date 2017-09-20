import React from 'react';
import TeamMember from './TeamMember';

const Team = () => (
  <div id="team">
    <div className="container">
      <div className="row">
        <div id="team-description" className="col-xs-12">
          <h2>Biz Kimiz?</h2>

          <p>Kripto Bürosu olarak amacımız size hızlı, güvenilir ve tamamen şeffaf bir hizmet sunmak. Takas etmek istediğiniz kripto paralarınızı en uygun fiyata alıyoruz, yenilerini direkt
          olarak cüzdanınıza gönderiyoruz.</p>
          <p>Herhangi bir döviz bürosunda para alıp satmak kadar basit: <b>Kayıt yok, Şart yok, Kimlik yok!</b></p>
          <p>Yaptığınız işlemler sadece size özel.</p>
        </div>
      </div>
    </div>
  </div>
);

export default Team;
