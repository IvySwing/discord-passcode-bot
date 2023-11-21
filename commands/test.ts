import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
		.setName('create')
		.setDescription('create your puzzle')
		.addStringOption(option =>
			option.setName('passcode')
				.setDescription('enter in passcode')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('text')
				.setDescription('enter in quest text')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('title')
				.setDescription('name of puzzle')
				.setRequired(true))

export async function execute(interaction: CommandInteraction){
	// if we're not repliable then exit
	if (!interaction.isRepliable()) {
		return
	}
	await interaction.reply({
		content: `you're all set`,
		fetchReply: true,
	})
	console.log('interaction', interaction.options.get('passcode').value)
	console.log('interaction', interaction.options.get('text').value)
	console.log('interaction', interaction.options.get('title').value)
};