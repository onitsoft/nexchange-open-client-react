import React from 'react';
import styles from './TeamMember.scss';

const TeamMember = props => {
  const social = [];
  Object.keys(props.social).forEach(key => {
    let className = `fab fa-${key}`;
    if (key === 'rss') {
      className = 'fas fa-rss';
    } else if (key === 'linkedin') {
      className = `fab fa-linkedin-in`;
    }

    social.push(
      <a href={props.social[key]} className={styles[key]} key={key} target="_blank" rel="noopener noreferrer">
        <i className={className} />
      </a>
    );
  });

  return (
    <div className="col-xs-12 col-ms-6 col-sm-4">
      <div className={styles.member}>
        <div className={styles.profile}>
          <img src={`/img/team/${props.id}.jpg`} alt={`${props.name} profile`} />
        </div>

        <h3 className={styles.name}>{props.name}</h3>
        <div className={styles.social}>{social}</div>
        <div className={styles.description}>{props.description}</div>
      </div>
    </div>
  );
};

export default TeamMember;
