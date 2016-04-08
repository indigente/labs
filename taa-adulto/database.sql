CREATE TABLE IF NOT EXISTS `neandertaa` (
  `idJogador` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(20) NOT NULL,
  `edade` int(2) NOT NULL,
  `escola` varchar(30) NOT NULL,
  `nascimento` date NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `trial1_3O` int(1) NOT NULL,
  `trial1_3L` int(1) NOT NULL,
  `trial1_3OL` int(1) NOT NULL,
  PRIMARY KEY (`idJogador`)
);
