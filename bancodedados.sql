DROP DATABASE frente_caixa;

CREATE DATABASE frente_caixa
CHARACTER SET utf8
COLLATE utf8_general_ci;

use frente_caixa;

-- CLIENTE 
CREATE TABLE cliente(
    id CHAR(36) PRIMARY KEY NOT NULL,
	nome varchar(120) NOT NULL,	
	codigo INT(11) NOT NULL,
	cnpj_cpf VARCHAR(13) NOT NULL,	
	data_nascimento DATE,
	rg VARCHAR(13) NOT NULL,
	municipio_id CHAR(36) NOT NULL,
	inscricao_estadual VARCHAR(11),
	bairro VARCHAR(120),
	numero_logradouro INT(9),
	logradouro VARCHAR(120),
	email VARCHAR(120),
	promocao_id INT(11),
	sn_ativo CHAR(2) NOT NULL
);


-- PACOTE_PROMOCAO
CREATE TABLE promocao(
    id CHAR(36) PRIMARY KEY NOT NULL,
    descricao VARCHAR(120) NOT NULL
);


-- COMBO_PROMOCAO
CREATE TABLE combo_promocao(
    id CHAR(36) PRIMARY KEY NOT NULL,
    valor_promocao FLOAT(10,2),
    item_id char(36) NOT NULL
);


-- ITEM
CREATE table item(
    id CHAR(36) PRIMARY KEY NOT NULL,
	codigo INT(11) NOT NULL,
	codigo_de_barra VARCHAR(20) NOT NULL,
	categoria_id INT(11),
	unidade_medida_id INT(11),
	saldo_estoque_atual INT(11) NOT NULL DEFAULT 0,
	registrar_comissao CHAR(1) NOT NULL,
	sn_ativo CHAR(1) NOT NULL,
	descricao VARCHAR(120),
	preco FLOAT(8,2) NOT NULL
);


-- UNIDADE_MEDIDA

CREATE TABLE unidade_medida(
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(60) NOT NULL
);


-- USUARIO 
CREATE TABLE usuario (
    id CHAR(36) PRIMARY KEY NOT NULL,
	nome VARCHAR(120) NOT NULL,
	login VARCHAR(9) NOT NULL,
	grupo_usuario_id INT(11),
	sn_ativo CHAR(2) NOT NULL	
);



-- MUNICIPIO 
CREATE TABLE municipio(
    id CHAR(36) PRIMARY KEY NOT NULL,
	descricao VARCHAR(120) NOT NULL
);



-- VENDA
CREATE TABLE venda(
    id CHAR(36) PRIMARY KEY NOT NULL,
	total_venda INT(11) NOT NULL,
	desconto INT(3),
	acrescimo INT(5),
	observacao VARCHAR(700),
	data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	sn_ativo CHAR(1) NOT NULL,
	cliente_id CHAR(36) NOT NULL
);



-- ITEM_VENDA
CREATE TABLE item_venda(
    id CHAR(36) PRIMARY KEY NOT NULL,
	item_id CHAR(36) NOT NULL,
	venda_id CHAR(36) NOT NULL,
	quantidade INT(9) NOT NULL,
	preco INT(9) NOT NULL,
	total INT(9) NOT NULL,
	desconto INT(3) NOT NULL,
	acrescimo INT(5) NOT NULL,
	data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	usuario_id CHAR(36) NOT NULL,
	sn_ativo CHAR(2) NOT NULL
);



-- TIPO_RECEBIMENTO
CREATE TABLE tipo_recebimento(
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(60) NOT NULL
);



-- FORMA_PAGAMENTO
CREATE TABLE forma_pagamento(
	codigo INT(11) PRIMARY KEY NOT NULL,
	descricao VARCHAR(60) NOT NULL,
	tipo_recebimento_id INT(11) NOT NULL
);



-- RECEBIMENTO_VENDA
CREATE TABLE recebimento_venda(
    id CHAR(36) PRIMARY KEY  NULL,
	venda_id INT(11) NOT NULL,
	forma_pagamento_id INT(11) NOT NULL
);



-- TIPO_OPEREACAO
CREATE TABLE tipo_operacao(
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(60) NOT NULL	
);



-- SYS_LOG_REGISTRO
CREATE TABLE sys_log_registro(
    id CHAR(36) PRIMARY KEY NOT NULL,
    tipo_operacao_id INT(11) NOT NULL,
    venda_id CHAR(36) NOT NULL,
    usuario_registro_id CHAR(36) NOT NULL,
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    query VARCHAR(60) NOT NULL,
    sn_ativo CHAR(1) NOT NULL
);



-- CATEGORIA 
CREATE TABLE categoria(
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(60) NOT NULL	
);



-- FOREING KEY 


-- CLIENTE
ALTER TABLE cliente
ADD CONSTRAINT fk_municipio_id
FOREIGN KEY (municipio_id) REFERENCES municipio(id);

ALTER TABLE cliente
ADD CONSTRAINT fk_promocao_id_cliente
FOREIGN KEY(promocao_id)
REFERENCES promocao(id);

-- COMBO PROMOCAO

ALTER TABLE combo_promocao
ADD CONSTRAINT fk_promocao_id_combo_promocao
FOREIGN KEY(item_id)
REFERENCES promocao(id);


-- VENDA
ALTER TABLE venda
ADD CONSTRAINT fk_cliente_id 
FOREIGN KEY (cliente_id) REFERENCES usuario(id);



-- ITEM_VENDA
ALTER TABLE item_venda
ADD CONSTRAINT fk_item_id
FOREIGN KEY (item_id) REFERENCES item(id);

ALTER TABLE item_venda
ADD CONSTRAINT fk_venda_id_item_venda_id
FOREIGN KEY (venda_id) REFERENCES venda(id);

ALTER TABLE item_venda
ADD CONSTRAINT fk_usuario_id
FOREIGN KEY (usuario_id) REFERENCES usuario(id);



-- ITEM 
ALTER TABLE item
ADD CONSTRAINT fk_categoria_id 
FOREIGN KEY (categoria_id) REFERENCES categoria(id);

ALTER TABLE item
ADD CONSTRAINT fk_unidade_medida_id
FOREIGN KEY (unidade_medida_id) REFERENCES usuario(id);
	


-- FORMA_PAGAMENTO 
ALTER TABLE forma_pagamento
ADD CONSTRAINT fk_tipo_recebimento
FOREIGN KEY (tipo_recebimento_id) REFERENCES tipo_recebimento(id);



-- RECEBIMENTO_VENDA
ALTER TABLE recebimento_venda
ADD CONSTRAINT fk_venda_id_recebimento_venda_id
FOREIGN KEY (venda_id) REFERENCES venda(id);

ALTER TABLE recebimento_venda
ADD CONSTRAINT fk_forma_pagamento_id
FOREIGN KEY (forma_pagamento_id) REFERENCES forma_pagamento(id);

-- DADOS INICIAIS

INSERT INTO tipo_recebimento(descricao) VALUES
("DINHEIRO"),
("PIX"),
("CRÉDITO"),
("DEBITO"),
("PRAZO");


INSERT INTO tipo_operacao(descricao) VALUES
("INSERT"),
("UPDATE"),
("DELETE");


-- TRIGGER PARA UID


DELIMITER ;

DELIMITER ;;
    CREATE TRIGGER tgr_before_insert_venda
    BEFORE INSERT ON venda
    FOR EACH ROW
    BEGIN
        IF NEW.id IS NULL THEN
            SET NEW.id = UUID();
        END IF;
    END ;;
DELIMITER ;

 DELIMITER ;;
    CREATE TRIGGER tgr_before_insert_usuario
    BEFORE INSERT ON usuario
    FOR EACH ROW
    BEGIN
        IF NEW.id IS NULL THEN
            SET NEW.id = UUID();
        END IF;
    END ;;
DELIMITER ;


DELIMITER ;;
    CREATE TRIGGER tgr_before_insert_sys_log_registro
    BEFORE INSERT ON sys_log_registro
    FOR EACH ROW
    BEGIN
        IF NEW.id IS NULL THEN
            SET NEW.id = UUID();
        END IF;
    END ;;
DELIMITER ;

 DELIMITER ;;
    CREATE TRIGGER tgr_before_insert_recebimento_venda
    BEFORE INSERT ON recebimento_venda
    FOR EACH ROW
    BEGIN
        IF NEW.id IS NULL THEN
            SET NEW.id = UUID();
        END IF;
    END ;;
DELIMITER ;

 DELIMITER ;;
    CREATE TRIGGER tgr_before_insert_item_venda
    BEFORE INSERT ON 
    FOR EACH ROW
    BEGIN
        IF NEW.id IS NULL THEN
            SET NEW.id = UUID();
        END IF;
    END ;;
DELIMITER ;


 DELIMITER ;;
    CREATE TRIGGER tgr_before_insert_item
    BEFORE INSERT ON item
    FOR EACH ROW
    BEGIN
        IF NEW.id IS NULL THEN
            SET NEW.id = UUID();
        END IF;
    END ;;
DELIMITER ;

 DELIMITER ;;
    CREATE TRIGGER tgr_before_insert_cliente
    BEFORE INSERT ON cliente
    FOR EACH ROW
    BEGIN
        IF NEW.id IS NULL THEN
            SET NEW.id = UUID();
        END IF;
    END ;;
DELIMITER ;

 DELIMITER ;;
    CREATE TRIGGER tgr_before_insert_municipio
    BEFORE INSERT ON municipio
    FOR EACH ROW
    BEGIN
        IF NEW.id IS NULL THEN
            SET NEW.id = UUID();
        END IF;
    END ;;
DELIMITER ;


 DELIMITER ;;
    CREATE TRIGGER tgr_before_insert_promocao
    BEFORE INSERT ON promocao
    FOR EACH ROW
    BEGIN
        IF NEW.id IS NULL THEN
            SET NEW.id = UUID();
        END IF;
    END ;;
DELIMITER ;


 DELIMITER ;;
    CREATE TRIGGER tgr_before_insert_combo_promocao
    BEFORE INSERT ON combo_promocao
    FOR EACH ROW
    BEGIN
        IF NEW.id IS NULL THEN
            SET NEW.id = UUID();
        END IF;
    END ;;
DELIMITER ;


-- https://loop.cloud.microsoft/p/eyJ1IjoiaHR0cHM6Ly9zZW5hY3JzZWR1LnNoYXJlcG9pbnQuY29tL2NvbnRlbnRzdG9yYWdlL3g4Rk5PLXh0c2t1Q1JYMl9mTVRITGZLdFk1VFJEdHBDbU9CSmVndDhLY0E%2FbmF2PWN6MGxNa1pqYjI1MFpXNTBjM1J2Y21GblpTVXlSbmc0Ums1UExYaDBjMnQxUTFKWU1sOW1UVlJJVEdaTGRGazFWRkpFZEhCRGJVOUNTbVZuZERoTFkwRW1aRDFpSVhGbFQyeHlaMDFuTVRBdGFrdFFkRXRFTUVVeGFHTkdWVEJ3VFU1UVlUVkdjbFZMUzNBdE9HNXZZVmt6TTA1UVJreERZakJVUzNGTVEybEtSMVJHV2xNbVpqMHdNVUpVVlZjeVVqVkdOME5EV1U5VFZWbFRXa2RMVFZjMFYxTk1VbHBNUzFBeUptTTlKVEpHSm1ac2RXbGtQVEVtY0QwbE5EQm1iSFZwWkhnbE1rWnNiMjl3TFhCaFoyVXRZMjl1ZEdGcGJtVnkifQ%3D%3D