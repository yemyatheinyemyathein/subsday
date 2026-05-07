"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConvertedPrice = exports.importCSV = exports.remove = exports.update = exports.create = exports.getById = exports.getAll = exports.updateValidation = exports.createValidation = void 0;
const express_validator_1 = require("express-validator");
const Subscription_1 = __importDefault(require("../models/Subscription"));
const currency_1 = require("../services/currency");
exports.createValidation = [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    (0, express_validator_1.body)('currency').optional().isString(),
    (0, express_validator_1.body)('billingCycle')
        .optional()
        .isIn(['monthly', 'yearly', 'weekly', 'custom']),
    (0, express_validator_1.body)('nextBillingDate').isISO8601().withMessage('Valid date is required'),
    (0, express_validator_1.body)('category').optional().isString(),
    (0, express_validator_1.body)('status').optional().isIn(['active', 'canceled']),
];
exports.updateValidation = [
    (0, express_validator_1.param)('id').isMongoId().withMessage('Invalid subscription ID'),
    (0, express_validator_1.body)('name').optional().trim().notEmpty(),
    (0, express_validator_1.body)('price').optional().isFloat({ min: 0 }),
    (0, express_validator_1.body)('currency').optional().isString(),
    (0, express_validator_1.body)('billingCycle')
        .optional()
        .isIn(['monthly', 'yearly', 'weekly', 'custom']),
    (0, express_validator_1.body)('nextBillingDate').optional().isISO8601(),
    (0, express_validator_1.body)('category').optional().isString(),
    (0, express_validator_1.body)('status').optional().isIn(['active', 'canceled']),
];
const getAll = async (req, res) => {
    const { status, category, sort = 'nextBillingDate', order = 'asc' } = req.query;
    const query = { user: req.user._id };
    if (status)
        query.status = status;
    if (category)
        query.category = category;
    const subscriptions = await Subscription_1.default.find(query)
        .sort({ [sort]: order === 'asc' ? 1 : -1 })
        .lean();
    res.json({ subscriptions });
};
exports.getAll = getAll;
const getById = async (req, res) => {
    const subscription = await Subscription_1.default.findOne({
        _id: req.params.id,
        user: req.user._id,
    });
    if (!subscription) {
        res.status(404).json({ error: 'Subscription not found' });
        return;
    }
    res.json({ subscription });
};
exports.getById = getById;
const create = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const subscription = new Subscription_1.default({
        ...req.body,
        user: req.user._id,
    });
    await subscription.save();
    res.status(201).json({ subscription });
};
exports.create = create;
const update = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const subscription = await Subscription_1.default.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true, runValidators: true });
    if (!subscription) {
        res.status(404).json({ error: 'Subscription not found' });
        return;
    }
    res.json({ subscription });
};
exports.update = update;
const remove = async (req, res) => {
    const subscription = await Subscription_1.default.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
    });
    if (!subscription) {
        res.status(404).json({ error: 'Subscription not found' });
        return;
    }
    res.json({ message: 'Subscription deleted' });
};
exports.remove = remove;
const importCSV = async (req, res) => {
    if (!req.body.subscriptions || !Array.isArray(req.body.subscriptions)) {
        res.status(400).json({ error: 'Invalid data format' });
        return;
    }
    const subscriptions = req.body.subscriptions.map((sub) => ({
        ...sub,
        user: req.user._id,
        nextBillingDate: new Date(sub.nextBillingDate),
    }));
    const created = await Subscription_1.default.insertMany(subscriptions);
    res.status(201).json({ count: created.length, subscriptions: created });
};
exports.importCSV = importCSV;
const getConvertedPrice = async (price, currency, targetCurrency) => {
    if (currency === targetCurrency)
        return price;
    return (0, currency_1.convertCurrency)(price, currency, targetCurrency);
};
exports.getConvertedPrice = getConvertedPrice;
//# sourceMappingURL=subscriptionController.js.map