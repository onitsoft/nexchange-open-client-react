import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

class FAQ extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    }
  }

  componentDidUpdate() {
    if (this.state.show != this.props.show) {
      this.setState({
        show: this.props.show
      });
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.props.onClose} >
        <div id="faq" className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.props.onClose}>
              <i className="material-icons">clear</i>
            </button>
          </div>

          <div className="modal-body">
            <h3>Siz Kimsiniz?</h3>
            <p>Kripto Bürosu Türkiye'nin ilk otomatik dijital para alım satım platformudur. Burada yapılan tüm işlemler İngiliz <a href="https://beta.companieshouse.gov.uk/company/10009845" target="_blank">Yoa Ltd.</a> şirketi altyapısıyla gerçekleştirilerek otomatik olarak hesabınıza aktarılmaktadır.</p>

            <h3>Ne yapıyorsunuz?</h3>
            <p>Biz hiçbir kullanıcımızın özel bilgilerini istemeden, sadece bir kripto para biriminden diğerine çevirme ve aktarım işlemleri yapıyoruz.</p>
            <p>Şimdilik Bitcoin, Ethereum, Litecoin ve DogeCoin olmak üzere tam 4 para birimini destekliyoruz ancak bu sayıyı daha da arttırmamız an meselesi!</p>

            <h3>Ücret nedir?</h3>
            <p>Eylül ayı boyunca hizmetimiz karşılığı hiçbir komisyon kesintisi yapmıyoruz. Yani bu kısa süre için <b>%0 komisyon</b> ile işlemlerinizi gerçekleştirebilirsiniz. Ekim ayından itibaren ufak bir komisyon belirleyeceğiz ancak yine de yabancı sitelerde bulabileceklerinizden bile düşük tutmaya gayret edeceğiz.</p>
            <p>Burada, cüzdanınıza geri transfer ücreti dahil, hiçbir zaman hiçbir gizli ek ücretle karşılaşmayacaksınız. <b>Alım satım işleminiz sırasında son tutar olarak ekranda ne görüyorsanız, cüzdanınıza gelecek olan miktar da daima o olacak!</b></p>

            <h3>İşlem süresi ne kadar?</h3>
            <p>İşleminizi başlatmak genellikle birkaç dakikadan uzun sürmez. Paranızın belirlediğiniz cüzdana aktarımı ise aktarılacak olan para biriminin blockchain yoğunluğuna ve hızına göre genellikle 10 ila 60 dakika arasında gerçekleşir.</p>

            <h3>Nasıl yapacağım?</h3>
            <p>Aslında o kadar basit ki, kendiniz de rahatlıkla çözebilirsiniz. İşte şöyle:</p>
            <ol>
              <li>
                İlk kutucuğa <b>satmak</b> istediğiniz para biriminin miktarını girip <b>türünü</b> seçiyorsunuz ve en sağdan da <b>almak istediğiniz</b> para birimininin türünü seçiyorsunuz. O anki kur durumuna göre sistemimiz hesabı otomatik olarak yapıyor. Eğer aklınıza yattıysa alttaki kırmızı "Hemen Çevir!" butonuna basıp işleminize devam edebilirsiniz.
                <img src="/img/step1.png" alt="Nasil yapacagim 1 adim" />
              </li>
              <li>
                Yeni açılan kutucuğa <b>çevirmek istediğiniz</b> para birimine ait bir cüzdan adresi giriyorsunuz (örn. BTC satıp ETH almak istiyorsanız buraya ETH cüzdan adresi girmelisiniz)
                <img src="/img/step2.png" alt="Nasil yapacagim 2 adim" />
              </li>
              <li>
                O anda sistem tarafından size özel yaratılan bir adrese, <b>ilk adımda belirttiğiniz para birimi ve miktarını göndermeniz istenecek.</b>
                <img src="/img/step3.png" alt="Nasil yapacagim 3 adim" />
              </li>
              <li>Paranız bizim hesabımıza geçer geçmez işlemlerinize başlayacağız ve kısa süre içinde istediğiniz para birimine çevirip cüzdanınıza göndermiş olacağız.</li>
              <li>Tebrikler! Kripto paranızı başarıyla satıp yerine yenisini aldınız.</li>
            </ol>
            <p>Yaptığınız ödeme işlemi tersine çevirilemez. Lütfen paranızın çevirilip size döneceği adresi doğru girdiğinize emin olun.</p>

            <h3>Hiçbir kişisel bilgimi vermek istemiyorum. Bu mümkün mü?</h3>
            <p>Sorun değil, biz de almak istemiyoruz zaten. <b>Kripto Bürosu'nda sizin hiçbir kişisel bilginiz istenmez ve saklanmaz.</b> Yaptığınız işlemler sadece size özel kalır.</p>

            <h3>Paralarımın güvenliğini nasıl sağlayacaksınız?</h3>
            <p>Şu anda Kripto Bürosu olarak hiçbir cüzdan hizmeti sağlamıyoruz, yani kimsenin parasını bünyemizde barındırmıyoruz. Bütün işlemler sizin iki cüzdanınız arasında gerçekleşiyor:</p>
            <ol>
              <li>Çevirmek istediğiniz parayı gönderdiğiniz (<b>harcama</b> cüzdanı)</li>
              <li>Çevirdiğiniz para birimini aldığınız (<b>alış</b> cüzdanı)</li>
            </ol>
            <p>İşlem tamamlandıktan sonra cüzdanlarınızın güvenliğinden tamamen siz sorumlusunuz.</p>

            <h3>İşlemimi nasıl takip edebilirim?</h3>
            <p>Her işleminizin şu şekilde özel bir kodu olacaktır:</p>
            <img src="/img/faq.png" style={{margin: "10px 0"}} alt="islem kodu ornegi" />
            <p>İşleminiz tamamlanana kadar bu kodu kaydettiğinizden emin olun. Sayfayı yer imlerinize ekleyerek de daha sonra tekrar ulaşabilirsiniz.</p>
            <p>İşleminizi başlattıktan sonra eğer bizim tarafımızdan bildirilen cüzdana satmak istediğiniz para biriminizin transferini başlattıysanız, sayfayı kapatmak, elektrik ya da internet kesintisi gibi durumlar işlemin sürekliliğini etkilemeyecektir. Almak istediğiniz para birimi hesabınıza kısa sürede gelecek.</p>
            <p>Eğer aklınıza takılan bir şey olursa bizimle iletişim kurmaktan çekinmeyin.</p>

            <h3>Nereden cüzdan alabilirim?</h3>
            <p>Kripto Bürosu'nu kullanmak için bir cizdana ihtiyacınız var çünkü biz sizin paranızı saklamayacağız ve kendi güvenliğinizi sağlayıp "sitenin başına bir şey mi geldi" korkusundan muaf olacaksınız. Çok iyi değil mi?</p>
            <p>Biraz araştırmayla çeşitli para birimlerini bir arada tutabilen cüzdanlar bulabilirsiniz ancak biz kimseye kefil olmak istemiyoruz. Aşağıda belirtilen cüzdanlar ilgili birimlerin resmi kabul edilen cüzdanlarıdır:</p>
            <ul>
              <li>Bitcoin (BTC): <a href="https://bitcoin.org/en/choose-your-wallet">https://bitcoin.org/en/choose-your-wallet</a></li>
              <li>Ethereum (ETH): <a href="https://github.com/ethereum/mist/releases">https://github.com/ethereum/mist/releases</a></li>
              <li>Litecoin (LTC): <a href="https://litecoin.org/">https://litecoin.org/</a></li>
            </ul>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-danger btn-simple" data-dismiss="modal" onClick={this.props.onClose} >Kapat</button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default FAQ;
