/*
작성자: 김지환
수정일자: 2023-10-18
내용: PlayHistory모델 정의  (상품 테이블)
*/
const Sequelize = require("sequelize");

class PlayHistory extends Sequelize.Model {
  static initiate(sequelize) {
    PlayHistory.init({
      id: { 
        //컬럼설정
        type: Sequelize.INTEGER, //타입설정(int)
        primaryKey: true, //기본키
        autoIncrement: true, //자동으로 1씩 증가해서 들어감
        allowNull: false, //null금지
        comment: "플리 번호 (기본키)", //컬럼 설명
      },
      userId: { //플리에 넣은 회원의 id 
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: "플리에 넣은 회원의 id(user테이블 id참조)",
      },
      musicId: { //플리에 담긴 곡 id
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "플리에 담긴 곡 id(product테이블 peodNum참조) ",
      },
      playDate: { //재생일
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: "재생일",
        //INSERT INTO foodingdb.playHistorys (name, price, content) values('삼다수', 1000, '제주도의 삼다수입니다');
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'PlayHistory',
      tableName: 'playhistorys',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) { //다른 모델과의 관계정의
    db.PlayHistory.belongsTo(db.User, {foreignKey: 'userId', targetKey: 'id'});
    db.PlayHistory.belongsTo(db.Music, {foreignKey: 'musicId', targetKey: 'id'});
  }
};

module.exports = PlayHistory;
