import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | daterange-edit", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders daterange-edit with data and month", async function(assert) {
    this.set("project", {
      yearFrom: 2000,
      monthFrom: 10,
      yearTo: 2005,
      monthTo: 3
    });

    await render(hbs`{{daterange-edit entity=project}}`);

    let months = this.$(".ember-power-select-selected-item");
    let years = this.$("input[type=number]");

    assert.equal(months[0].innerText, "10");
    assert.equal(months[1].innerText, "3");
    assert.equal(years[0].valueAsNumber, 2000);
    assert.equal(years[1].valueAsNumber, 2005);
  });

  test("it renders daterange-edit with data no month", async function(assert) {
    this.set("project", {
      yearFrom: 2000,
      monthFrom: null,
      yearTo: 2005,
      monthTo: null
    });

    await render(hbs`{{daterange-edit entity=project}}`);

    let months = this.$(".ember-power-select-selected-item");
    let years = this.$("input[type=number]");

    assert.equal(months[0].innerText, "-");
    assert.equal(months[1].innerText, "-");
    assert.equal(years[0].valueAsNumber, 2000);
    assert.equal(years[1].valueAsNumber, 2005);
  });

  test("it renders daterange-edit without data", async function(assert) {
    this.set("project", {
      isNew: true
    });

    await render(hbs`{{daterange-edit entity=project}}`);

    let months = this.$(".ember-power-select-selected-item");
    let years = this.$("input[type=number]");

    assert.equal(months[0].innerText, "-");
    assert.equal(months[1].innerText, "-");
    assert.equal(years[0].value, "");
    assert.equal(years[1].value, "");
  });
});
