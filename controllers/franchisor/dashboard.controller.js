const { Op, fn, col, literal } = require("sequelize");
const moment = require("moment");
const {
  transaction,
  complaint,
  compensation,
  clarification,
  contract,
  user,
  agreement,
  franchisee
} = require("../../models");

exports.dashboard = async (req, res) => {
  try {
    const franchisees = await franchisee.findAll({ attributes: ["id", "outletName"] });
    const franchiseeIds = franchisees.map((f) => f.id);
    const sixMonthsAgo = moment().subtract(6, "months").toDate();

    const totalFranchisees = await franchisee.count();
    const totalTransactions = await transaction.count({ where: { franchiseeId: { [Op.in]: franchiseeIds } } });
    const totalComplaints = await complaint.count({ where: { franchiseeId: { [Op.in]: franchiseeIds } } });

    // Complaints per month
    const complaintsRaw = await complaint.findAll({
      attributes: [[fn("DATE_FORMAT", col("createdAt"), "%Y-%m"), "month"], [fn("COUNT", "*"), "total"]],
      where: { franchiseeId: { [Op.in]: franchiseeIds }, createdAt: { [Op.gte]: sixMonthsAgo } },
      group: [literal("month")],
      order: [[literal("month"), "ASC"]],
    });
    const complaintsPerMonth = complaintsRaw.map((row) => ({
      month: moment(row.get("month")).format("MMM YYYY"),
      total: parseInt(row.get("total"))
    }));

    // Transactions per month
    const transactionsRaw = await transaction.findAll({
      attributes: [[fn("DATE_FORMAT", col("createdAt"), "%Y-%m"), "month"], [fn("COUNT", "*"), "total"]],
      where: { franchiseeId: { [Op.in]: franchiseeIds }, createdAt: { [Op.gte]: sixMonthsAgo } },
      group: [literal("month")],
      order: [[literal("month"), "ASC"]],
    });
    const transactionsPerMonth = transactionsRaw.map((row) => ({
      month: moment(row.get("month")).format("MMM YYYY"),
      total: parseInt(row.get("total"))
    }));

    // Contracts grouped by STATUS (for Pie Chart)
    const contractsByStatusRaw = await contract.findAll({
      attributes: ["status", [fn("COUNT", "*"), "total"]],
      where: { franchiseeId: { [Op.in]: franchiseeIds } },
      group: ["status"]
    });
    const contractsByStatus = contractsByStatusRaw.map(row => ({
      status: row.get("status"),
      value: parseInt(row.get("total"))
    }));
    
    // Agreement grouped by STATUS (for Pie Chart)
    const agreementsByStatusRaw = await agreement.findAll({
      attributes: ["status", [fn("COUNT", "*"), "total"]],
      where: { franchiseeId: { [Op.in]: franchiseeIds } },
      group: ["status"]
    });
    const agreementsByStatus = agreementsByStatusRaw.map(row => ({
      status: row.get("status"),
      value: parseInt(row.get("total"))
    }));

    res.json({
      totalFranchisees,
      totalTransactions,
      totalComplaints,
      complaintsPerMonth,
      transactionsPerMonth,
      contractsByStatus,
      agreementsByStatus,
      
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
