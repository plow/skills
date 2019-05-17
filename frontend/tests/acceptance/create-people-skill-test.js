import { test } from 'qunit';
import moduleForAcceptance from 'frontend/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'frontend/tests/helpers/ember-simple-auth';
import applicationPage from 'frontend/tests/pages/application';
import page from 'frontend/tests/pages/person-skills';

moduleForAcceptance('Acceptance | create peopleSkill');

test('creating a new peopleSkill', async function(assert) {
  assert.expect(2);

  authenticateSession(this.application, {
    ldap_uid: 'development_user',
    token: '1234'
  });

  // Go to the start page and select a user from the dropdown
  await applicationPage.visitHome('/');
  await selectChoose('#people-search', '.ember-power-select-option', 0);

  // Visits person/:id/skills
  await page.visit({ person_id: /\d+$/.exec(currentURL()) })

  // Selection for all the power selects
  /* eslint "no-undef": "off" */
  await page.newPeopleSkillModal.openModalButton();
  await selectChoose('#people-skill-new-skill', 'Bash');
  $(".people-skill-new-dropdowns .slider-tick:eq(2)").mousedown()
  await page.newPeopleSkillModal.interestButtons.objectAt(3).clickOn();
  await page.newPeopleSkillModal.certificateToggle();

  await page.newPeopleSkillModal.createPeopleSkill({});

  let names = page.peopleSkillsTable.skillNames.toArray().map(name => name.text)
  assert.ok(names.includes('Bash'));
  let levels = page.peopleSkillsTable.levels.toArray().map(name => name.text)
  assert.ok(levels.map(name => name.includes('Trainee')).includes(true));
});