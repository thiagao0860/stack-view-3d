import React from 'react';

class Devs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      devAbout: true,
      devResume: false,
      devSkills: false,
      currentDev: {
        avatar: "/devs/elisbao.jpeg",
        about: {
          name: "",
          nasc: "",
          desc: ""
        },
        resume: {
          education: [
            {
              svg: "",
              title: "",
              where: "",
              period: ""
            }
          ],
          professional: [
            {
              svg: "",
              title: "",
              where: "",
              period: ""
            }
          ],
        },
        skills: {
          frontend: [{
            svg: "",
            skill: "",
            level: "",
            xp: ""
          }],
          backend: [{
            svg: "",
            skill: "",
            level: "",
            xp: ""
          }],
          other: [{
            svg: "",
            skill: "",
            level: "",
            xp: ""
          }],
        }


        ,
        cv: "",
      }
    };
    this.handleScroll = this.handleScroll.bind(this);
  }


  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.getJSONFromApi('/devs/elisbao.json').then((json) => {
      this.setState({
        currentDev: json
      })
    })

  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll(event) {

    this.setState({
    });

  };

  async getJSONFromApi(route) {
    try {
      let response = await fetch(route);
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  showAbout = () => {
    this.setState({
      devAbout: true,
      devResume: false,
      devSkills: false,
    })
  }
  showResume = () => {
    this.setState({
      devAbout: false,
      devResume: true,
      devSkills: false,
    })
  }
  showSkills = () => {
    this.setState({
      devAbout: false,
      devResume: false,
      devSkills: true,
    })
  }

  showDevInfo = (e) => {
    let id = e.target.id;
    if (id === 'elisbao') {
      this.getJSONFromApi('/devs/elisbao.json').then((json) => {
        this.setState({
          currentDev: json
        })
      })
    } else {
      this.getJSONFromApi('/devs/thiagao.json').then((json) => {
        this.setState({
          currentDev: json
        })
      })
    }

  }

  getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }


  render() {
    const {currentDev} = this.state;

    return <div className="devs">
      <div className="listDevs">
        <div className="title sv">We,</div>
        <div id="elisbao" className={currentDev.avatar !== "/devs/elisbao.jpeg"? 'devFotoAct':'devFoto'} onClick={this.showDevInfo}>
       <img
              id="elisbao"
              src="/viewicons/iconStackView.svg"
              alt="elisbao"
              width={90}
              height={90}
            />
            <img
              id="elisbao"
              src="/devs/elisbao.jpeg"
              alt="elisbao"
              width={120}
              height={120}
            />
        </div>
        <div id="thiagao" className={currentDev.avatar !== "/devs/thiagao.jpg"? 'devFotoAct':'devFoto'} onClick={this.showDevInfo}>
<img
              id="thiagao"
              src="/viewicons/iconStackView.svg"
              alt="elisbao"
              width={90}
              height={90}
            />    
          <img
            id="thiagao"
            src="/devs/thiagao.jpg"
            alt="thiagao"
            width={120}
            height={120}
          />
        </div>
      </div>
      <div className='somenteMobile tabsDevs'>
        <button onClick={this.showAbout} class={this.state.devAbout ? "octActv" : "oct"}><span className='custom'>About</span></button>
        <button onClick={this.showResume} class={this.state.devResume ? "octActv" : "oct"}><span className="custom">Resume</span></button>
        <button onClick={this.showSkills} class={this.state.devSkills ? "octActv" : "oct"}><span className="custom">Skills</span></button>
      </div>
      <div className="aboutDevs">
        <div className="devsSide">
          <div className="devsCardImg">
            <img
              id="t"
              src={currentDev.avatar}
              alt="currentDev"
              width={130}
              height={130}
            />
          </div>
          <div className="devsMenu">

            <button onClick={this.showAbout} class={this.state.devAbout ? "octagonActv" : "octagon"}><span className='custom'>About</span></button>
            <button onClick={this.showResume} class={this.state.devResume ? "octagonActv" : "octagon"}><span className="custom">Resume</span></button>
            <button onClick={this.showSkills} class={this.state.devSkills ? "octagonActv" : "octagon"}><span className="custom">Skills</span></button>

            <button class="downloadbutton" onClick={() => window.open(currentDev.cv)}><span className="custom ">Download cv</span></button>
          </div>
        </div>
        <div className="devsBody">
          <p className='titleDevAbout'>{currentDev.about.name}, <span>{this.getAge(currentDev.about.nasc)}</span></p>

          {this.state.devAbout && <div className="devAbout">
            {currentDev.about.desc}
          </div>}
          {this.state.devResume && <div className="devResume">
            <p>EDUCATION</p>
            <div className='cards'>{currentDev.resume.education.map((element) => {
              return (
                <div className='cardResume'>
                  <div className='svg'><img src={element.svg}
                    alt="icon"
                    width={60}
                    height={60}></img></div>
                  <div className='content'>
                    <span>{element.title}</span>
                    <span>{element.where}</span>
                    <span>{element.period}</span>
                  </div>
                </div>
              )
            })}</div>

            <p>EXPERIENCE</p>
            <div className='cards'>{currentDev.resume.professional.map((element) => {
              return (
                <div className='cardResume'>
                  <div className='svg'><img src={element.svg}
                    alt="icon"
                    width={60}
                    height={60}></img></div>
                  <div className='content'>
                    <span>{element.title}</span>
                    <span>{element.where}</span>
                    <span>{element.period}</span>
                  </div>
                </div>
              )
            })}</div>


          </div>}
          {this.state.devSkills && <div className="devSkills">
            <p>FRONT END</p>
            <div className='cards'>{currentDev.skills.frontend.map((element) => {
              return (
                <div className='cardSkill'>
                  <div className='svg'><img src={element.svg}
                    alt="icon"
                    width={30}
                    height={30}></img></div>
                  <div className='content'>
                    <span>{element.skill}</span>
                    <span><div class="progress">
                      <span class="progress-bar" style={{ "width": element.level }}></span>
                    </div>
                    {/* {element.level} */}
                    </span>
                    <span>{element.xp}</span>
                  </div>
                </div>

              )
            })}</div>
            <p>BACK END</p>
            <div className='cards'>{currentDev.skills.backend.map((element) => {
              return (
                <div className='cardSkill'>
                  <div className='svg'><img src={element.svg}
                    alt="icon"
                    width={30}
                    height={30}></img></div>
                  <div className='content'>
                    <span>{element.skill}</span>
                    <span><div class="progress">
                      <span class="progress-bar" style={{ "width": element.level }}></span>
                    </div>{element.level}</span>
                    <span>{element.xp}</span>
                  </div>
                </div>

              )
            })}</div>
            <p>OTHER SKILLS</p>
            <div className='cards'>{currentDev.skills.other.map((element) => {
              return (
                <div className='cardSkill'>
                  <div className='svg'><img src={element.svg}
                    alt="icon"
                    width={30}
                    height={30}></img></div>
                  <div className='content'>
                    <span>{element.skill}</span>
                    <span><div class="progress">
                      <span class="progress-bar" style={{ "width": element.level }}></span>
                    </div>{element.level}</span>
                    <span>{element.xp}</span>
                  </div>
                </div>

              )
            })}</div>

          </div>}
        </div>
      </div>
      <div className='somenteMobile downloadMobilebutton'>
        <button class="downloadbutton" onClick={() => window.open(currentDev.cv)}><span className="custom ">Download cv</span></button>
      </div>
    </div>
  }
}

export default Devs;