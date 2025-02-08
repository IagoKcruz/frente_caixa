'use strict';

/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("usuario", [
      { id: uuidv4(), nome: "iago", login: "icruz" ,email : "iago@iago.com", sn_ativo : "S" }
    ]);

    await queryInterface.bulkInsert("municipio", [
      { id: uuidv4(), descricao: "Candelária" },
      { id: uuidv4(), descricao: "Encruzilhada do Sul" },
      { id: uuidv4(), descricao: "Gramado Xavier" },
      { id: uuidv4(), descricao: "Herveiras" },
      { id: uuidv4(), descricao: "Mato Leitão" },
      { id: uuidv4(), descricao: "Passo do Sobrado" },
      { id: uuidv4(), descricao: "Rio Pardo" },
      { id: uuidv4(), descricao: "Santa Cruz do Sul" },
      { id: uuidv4(), descricao: "Sinimbu" },
      { id: uuidv4(), descricao: "Vale Verde" },
      { id: uuidv4(), descricao: "Vera Cruz" },
      { id: uuidv4(), descricao: "Arroio do Tigre" },
      { id: uuidv4(), descricao: "Sobradinho" },
      { id: uuidv4(), descricao: "Segredo" },
      { id: uuidv4(), descricao: "Lagoa Bonita do Sul" }
    ]);

    await queryInterface.bulkInsert("categoria", [
      { descricao: "Camisetas" },
      { descricao: "Calças" },
      { descricao: "Casacos" },
      { descricao: "Vestidos" },
      { descricao: "Saias" },
      { descricao: "Bermudas" },
      { descricao: "Sapatos" },
      { descricao: "Acessórios" }
    ]);

    await queryInterface.bulkInsert("unidade_medida", [
      { descricao: "Quilograma (Kg)" },
      { descricao: "Litro (L)" },
      { descricao: "Metro (M)" },
      { descricao: "Centímetro (CM)" },
      { descricao: "Mililitro (ML)" },
      { descricao: "Pequeno (P)" },
      { descricao: "Médio (M)" },
      { descricao: "Grande (G)" },
      { descricao: "Extra Grande (GG)" },
      { descricao: "Unidade (UN)" }
    ]);

    const tiposRecebimento = [
      { id: uuidv4(), descricao: "Crédito" },
      { id: uuidv4(), descricao: "Débito" },
      { id: uuidv4(), descricao: "Dinheiro" },
      { id: uuidv4(), descricao: "Pix" },
      { id: uuidv4(), descricao: "Boleto" },
      { id: uuidv4(), descricao: "Transferência Bancária" },
      { id: uuidv4(), descricao: "Carteira Digital" },
      { id: uuidv4(), descricao: "Cheque" },
      { id: uuidv4(), descricao: "Vale-Alimentação" },
      { id: uuidv4(), descricao: "Vale-Refeição" }
    ];
    await queryInterface.bulkInsert("tipo_recebimento", [
      { id: 1, descricao: "Crédito" },
      { id: 2, descricao: "Débito" },
      { id: 3, descricao: "Dinheiro" },
      { id: 4, descricao: "Pix" },
      { id: 5, descricao: "Boleto" },
      { id: 6, descricao: "Transferência Bancária" },
      { id: 7, descricao: "Carteira Digital" },
      { id: 8, descricao: "Cheque" },
      { id: 9, descricao: "Vale-Alimentação" },
      { id: 10, descricao: "Vale-Refeição" }
    ]);

    return queryInterface.bulkInsert("forma_pagamento", [
      { id: uuidv4(), codigo: 101, descricao: "À vista", tipo_recebimento_id: 2 },
      { id: uuidv4(), codigo: 102, descricao: "30 dias", tipo_recebimento_id: 2 },
      { id: uuidv4(), codigo: 201, descricao: "Crédito 1x", tipo_recebimento_id: 1 },
      { id: uuidv4(), codigo: 202, descricao: "Crédito 2x", tipo_recebimento_id: 1 },
      { id: uuidv4(), codigo: 203, descricao: "Crédito 3x", tipo_recebimento_id: 1 },
      { id: uuidv4(), codigo: 204, descricao: "Crédito 4x", tipo_recebimento_id: 1 },
      { id: uuidv4(), codigo: 301, descricao: "Banco Banrisul", tipo_recebimento_id: 6 },
      { id: uuidv4(), codigo: 302, descricao: "Banco do Brasil", tipo_recebimento_id: 6 }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("municipio", null, {});
    await queryInterface.bulkDelete("usuario", null, {});
    await queryInterface.bulkDelete("categoria", null, {});
    await queryInterface.bulkDelete("unidade_medida", null, {});
    await queryInterface.bulkDelete("forma_pagamento", null, {});
    return queryInterface.bulkDelete("tipo_recebimento", null, {});
  }
};
