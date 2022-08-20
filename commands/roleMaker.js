const { SlashCommandBuilder, Colors } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("baker")
    .setDescription("Makes a roll")
    .addStringOption((nameRoll) =>
      nameRoll
        .setName("name")
        .setDescription("The name of the role")
        .setRequired(true)
    ),
  async execute(interaction) {
    const guild = interaction.member.guild;
    const nameRoll = interaction.options.getString("name");

    try {
      const nyRoll = await guild.roles.create({
        name: nameRoll,
        color: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
        reason: "Vi behövde en roll för bajskorvar",
      });
      await interaction.reply(`The role ${nyRoll}was created`);
    } catch (error) {
      console.log(error);
    }
  },
};
