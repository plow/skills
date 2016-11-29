class Person::ProjectsController < CrudController
  self.permitted_attrs = [:description, :title, :role, :technology, :year_to, :year_from]

  def fetch_entries
    Project.where(person_id: params['person_id'])
  end
end