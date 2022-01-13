const joi = require("joi");

const CustomError = require("../helpers/CustomError")

module.exports = class Validations {
	static async LanguageValidation(data, Error) {
		return await joi
			.object({
				language_name: joi
					.string()
					.required()
					.max(64)
					.error(new Error(400, "Name is invalid")),
				status: joi
					.string()
					.required()
					.valid("active", "recording", "deleted")
					.error(new Error(400, "This option isn't available")),
			})
			.validateAsync(data);
	}
    
    static async SubjectValidation(data, Error) {
		return await joi
			.object({
				subject_name: joi
					.string()
					.required()
					.max(64)
					.error(new Error(400, "Name is invalid")),
				language_id: joi
					.string()
                    .guid()
					.required()
					.error(new Error(400, "Language id is invalid")),
			})
			.validateAsync(data);
	}

	static async TutorialValidation(data, Error) {
		return await joi
			.object({
				tutorial_name: joi
					.string()
					.required()
					.max(64)
					.error(new Error(400, "Tutorial name is invalid")),
				language_id: joi
					.string()
                    .guid()
					.required()
					.error(new Error(400, "Language id is invalid")),
				subject_id: joi
					.string()
                    .guid()
					.required()
					.error(new Error(400, "Subject id is invalid")),
				tutorial_content: joi
					.required()
					.error(new Error(400, "Content text is invalid")),
			})
			.validateAsync(data);
	}

};