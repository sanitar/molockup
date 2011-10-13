class MockupsController < ApplicationController
  
  load_and_authorize_resource
  before_filter :load_project
  
  def index
    @mockups = @project.mockups
  end

  def show
    @mockup = Mockup.find(params[:id])
  end

  def new
    @mockup = Mockup.new
  end

  def create
    @mockup = Mockup.new(params[:mockup])
    @mockup.project = @project
    
    if @mockup.save
      redirect_to [@project, @mockup], :notice => "Successfully created mockup."
    else
      render :action => 'new'
    end
  end

  def edit
    @mockup = Mockup.find(params[:id])
  end

  def update
    @mockup = Mockup.find(params[:id])
    if @mockup.update_attributes(params[:mockup])
      redirect_to [@project, @mockup], :notice  => "Successfully updated mockup."
    else
      render :action => 'edit'
    end
  end

  def destroy
    @mockup = Mockup.find(params[:id])
    @mockup.destroy
    redirect_to project_mockups_url(@project), :notice => "Successfully destroyed mockup."
  end
  
  private
  
  def load_project
    @project = Project.find(params[:project_id])
  end
end
