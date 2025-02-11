'use strict';

/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("usuario", [
      { id: uuidv4(), nome: "iago", login: "icruz", email: "iago@iago.com", sn_ativo: "S" }
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

    const uid1 = uuidv4()
    const uid2 = uuidv4()
    const uid3 = uuidv4()

    const promocoes = await queryInterface.bulkInsert('Promocao', [
      {id: uid1, descricao: 'Promoção 10% de desconto', valor_final: 100.0, sn_ativo: 'S', sn_promocao_geral : 'N', sn_percentagem : 'N' , createdAt: new Date(),updatedAt: new Date(),},
      {id: uid2, descricao: 'Promoção 20% de desconto', valor_final: 100.0, sn_ativo: 'S', sn_promocao_geral : 'N', sn_percentagem : 'N' , createdAt: new Date(),updatedAt: new Date(),},
      {id: uid3, descricao: 'Promoção 30% de desconto', valor_final: 100.0, sn_ativo: 'S', sn_promocao_geral : 'S', sn_percentagem : 'S' , createdAt: new Date(),updatedAt: new Date(),},
    ], { returning: true });

    // Inserir os combos promocionais
    // await queryInterface.bulkInsert('combo_promocao', [
    //   {
    //     id: uuidv4(),valor_promocao: null,valor_percentagem: 10, valor_final_promocao: 100, promocao_id: uid1, item_id: uuidv4(), 
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     id: uuidv4(),valor_promocao: null,valor_percentagem: 20, valor_final_promocao: 100, promocao_id: uid2, item_id: uuidv4(), 
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     id: uuidv4(),valor_promocao: null,valor_percentagem: 30, valor_final_promocao: 100, promocao_id: uid3, item_id: uuidv4(), 
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // ]);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("municipio", null, {});
    await queryInterface.bulkDelete("usuario", null, {});
    await queryInterface.bulkDelete("categoria", null, {});
    await queryInterface.bulkDelete("unidade_medida", null, {});
    await queryInterface.bulkDelete("tipo_recebimento", null, {});
    //await queryInterface.bulkDelete('combo_promocao', null, {});
    return queryInterface.bulkDelete('Promocao', null, {});
  }
};

