require 'rails_helper'

describe CategoriesController do
  describe 'CategoriesController' do
    before { auth(:ken) }

    describe 'GET index' do
      it 'returns all categories' do
        keys = %w[title parent_id]

        get :index

        categories = json['data']

        expect(categories.count).to eq(5)
        java_attrs = categories.first['attributes']
        expect(java_attrs.count).to eq (2)
        expect(java_attrs['title']).to eq ('Java')
        json_object_includes_keys(java_attrs, keys)
      end

      it 'returns only parents if param present' do
        keys = %w[title parent_id]

        get :index, params: { scope: 'parents' }

        categories = json['data']

        expect(categories.count).to eq(2)
        software_engineering_attrs = categories.first['attributes']
        expect(software_engineering_attrs.count).to eq (2)
        expect(software_engineering_attrs['title']).to eq ('Software-Engineering')
        expect(software_engineering_attrs['parent_id']).to eq (nil)
        json_object_includes_keys(software_engineering_attrs, keys)
      end
    end
  end
end