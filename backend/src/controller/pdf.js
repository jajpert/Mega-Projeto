const knex = require("../db");
const PDFDocument = require('pdfkit');
const { PassThrough } = require('stream');

const gerarRelatorioPDF = async (req, res) => {
  try {
    const resultados = await knex('usuarios as u')
      .join('compra as c', 'u.id', 'c.usuario_id')
      .join('itens_compra as ic', 'c.id', 'ic.compra_id')
      .join('produtos as p', 'ic.produto_id', 'p.id')
      .select(
        'u.nome as nome_usuario',
        'u.email as email_usuario',
        'c.id as compra_id',
        'p.nome as nome_produto',
        knex.raw('SUM(ic.quantidade * ic.valor) AS valor_total')
      )
      .groupBy('u.nome', 'u.email', 'c.id', 'p.nome')
      .orderBy('c.id');

    const doc = new PDFDocument();
    const stream = doc.pipe(new PassThrough());

    res.setHeader('Content-Disposition', 'attachment; filename="relatorio_mega.pdf"');
    res.setHeader('Content-Type', 'application/pdf');

    if (resultados.length === 0) {
      doc.fontSize(16).text('Sem relatórios sobre a Mega Farma', 100, 100);
    } else {
      doc.fontSize(16).text('Relatório de Compras', { align: 'center' });

      resultados.forEach((resultado) => {
        doc.moveDown()
          .fontSize(12)
          .text(`Usuário: ${resultado.nome_usuario}`)
          .text(`Email: ${resultado.email_usuario}`)
          .text(`ID da Compra: ${resultado.compra_id}`)
          .text(`Produto: ${resultado.nome_produto}`)
          .text(`Valor Total: R$ ${resultado.valor_total.toFixed(2)}`);
      });
    }

    doc.end();

    stream.pipe(res);

  } catch (error) {
    console.error('Erro ao gerar o relatório:', error.message);
    res.status(500).json({ mensagem: error.message });
  }
};

module.exports = gerarRelatorioPDF;
