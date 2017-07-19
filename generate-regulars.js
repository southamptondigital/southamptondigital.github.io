#!/usr/bin/env node

const { RRule } = require('rrule');
const fs = require('fs');
const yaml = require('js-yaml');

const EVENTS = `${__dirname}/_events/`;

const auto = str => `❗️ Auto-generated! ${str || ""}❗️`;

const regularEvents = [
  {
    alias: 'fullstackhants',
    template: {
      name: "Full Stack Hampshire",
      description: auto(),
      group_name: "Full Stack Hampshire",
      location: "Etch, Suite R Medina Chambers, Town Quay, Southampton, SO14 2AQ",
      href: "https://twitter.com/fullstackhants",
      food: true,
      beer: true,
      on_site_parking: false,
    },

    rule: new RRule({
      freq: RRule.MONTHLY,
      byweekday: [RRule.MO],
      bysetpos: 2,
      dtstart: new Date(Date.parse('2017-03-13T19:00:00Z')),
    }),
    durationInMinutes: 60,
  },

  {
    alias: 'devsouthcoast',
    template: {
      name: "Developer South Coast",
      description: auto("See Meetup for correct data"),
      href: "https://www.meetup.com/DeveloperSouthCoast/",
      ticket_price: "Membership £30/yr",
      group_name: "Developer South Coast",
      group_contact_href: "https://www.meetup.com/DeveloperSouthCoast/",
      location: "Avenue St Andrew's URC, The Avenue, Southampton",
      food: true,
      beer: false,
      on_site_parking: false,
    },
    rule: new RRule({
      freq: RRule.MONTHLY,
      byweekday: [RRule.TH],
      bysetpos: 3,
      dtstart: new Date(Date.parse('2017-07-20T19:00:00+01:00')),
    }),
    durationInMinutes: 60,
  },
];

const today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
today.setMilliseconds(0);
const threeMonthsTime = new Date(+today + 90 * 24 * 60 * 60 * 1000);

for (const event of regularEvents) {
  const dates = event.rule.between(today, threeMonthsTime);
  if (event.template.date || event.template.date_end) {
    throw new Error("Bad template");
  }
  for (const date of dates) {
    const end = new Date(date + event.durationInMinutes * 60 * 1000)
    const template = Object.assign({}, {
      date: date,
      date_end: end,
    }, event.template);
    const yyyymmdd = date.toISOString().substr(0,10).replace(/-/g, '');
    const { alias } = event;
    if (!alias) {
      throw new Error("Invalid alias");
    }
    const filePath = `${EVENTS}/${yyyymmdd}-${alias}.md`
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, `---\n${yaml.safeDump(template)}\n---\n`);
    }
  }
}
